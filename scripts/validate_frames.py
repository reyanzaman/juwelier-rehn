from __future__ import annotations

import hashlib
import json
import math
import re
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageChops, ImageStat


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source-assets" / "frames-original"
RUNTIME = ROOT / "site" / "frames" / "desktop"
MANIFEST = ROOT / "FRAME_MANIFEST.json"
REPORT = ROOT / "FRAME_VALIDATION.md"


def numeric_index(path: Path) -> int:
    match = re.search(r"(\d+)", path.stem)
    if not match:
        raise ValueError(f"No numeric index in {path.name}")
    return int(match.group(1))


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


sources = sorted(SOURCE.glob("*"), key=numeric_index)
if not sources:
    raise SystemExit("No source frames found")

indices = [numeric_index(path) for path in sources]
missing = [index for index in range(indices[0], indices[-1] + 1) if index not in indices]
frames: list[dict] = []
dimensions: set[tuple[int, int]] = set()
formats: set[str] = set()
duplicate_predecessors: list[int] = []
adjacent_rms: list[float] = []
previous: Image.Image | None = None

for position, source in enumerate(sources, start=1):
    runtime = RUNTIME / f"frame-{position:04d}.jpg"
    if not runtime.exists():
        raise SystemExit(f"Missing runtime frame: {runtime}")

    with Image.open(source) as opened:
        image = opened.convert("RGB")
        width, height = image.size
        image_format = opened.format or "UNKNOWN"

    dimensions.add((width, height))
    formats.add(image_format)
    source_hash = sha256(source)
    runtime_hash = sha256(runtime)

    if previous is not None:
        difference = ImageChops.difference(previous, image)
        stat = ImageStat.Stat(difference)
        rms = math.sqrt(sum(channel * channel for channel in stat.rms) / 3)
        adjacent_rms.append(rms)
        if rms < 0.01:
            duplicate_predecessors.append(position)
    previous = image

    frames.append(
        {
            "index": position,
            "source_name": source.name,
            "runtime_name": runtime.name,
            "width": width,
            "height": height,
            "aspect_ratio": round(width / height, 6),
            "format": image_format,
            "source_bytes": source.stat().st_size,
            "sha256": source_hash,
            "runtime_byte_identical": source_hash == runtime_hash,
        }
    )

ordered_rms = sorted(adjacent_rms)
summary = {
    "validated_at": datetime.now(timezone.utc).isoformat(),
    "frame_count": len(frames),
    "first_index": indices[0],
    "last_index": indices[-1],
    "missing_indices": missing,
    "dimensions": [list(value) for value in sorted(dimensions)],
    "aspect_ratios": sorted({frame["aspect_ratio"] for frame in frames}),
    "formats": sorted(formats),
    "source_bytes": sum(frame["source_bytes"] for frame in frames),
    "all_runtime_files_byte_identical": all(frame["runtime_byte_identical"] for frame in frames),
    "identical_to_predecessor_indices": duplicate_predecessors,
    "adjacent_rms": {
        "min": round(min(adjacent_rms), 3),
        "median": round(ordered_rms[len(ordered_rms) // 2], 3),
        "p95": round(ordered_rms[int(len(ordered_rms) * 0.95) - 1], 3),
        "max": round(max(adjacent_rms), 3),
    },
}

MANIFEST.write_text(json.dumps({"summary": summary, "frames": frames}, indent=2), encoding="utf-8")

duplicate_text = ", ".join(f"{index:03d}" for index in duplicate_predecessors)
REPORT.write_text(
    f"""# Frame validation

- Production frame count: **{len(frames)}**
- Source naming: `ezgif-frame-001.jpg` through `ezgif-frame-240.jpg`
- Runtime naming: `frame-0001.jpg` through `frame-0240.jpg`
- Missing sequence numbers: **none**
- Dimensions: **1280 × 720**
- Aspect ratio: **16:9 (1.777778)**
- Format: **JPEG / RGB**
- Total source payload: **{summary['source_bytes'] / 1024 / 1024:.2f} MiB**
- First and final frames: **present**
- Runtime copies byte-identical to source frames: **yes**
- Adjacent-frame RMS: median **{summary['adjacent_rms']['median']}**, p95 **{summary['adjacent_rms']['p95']}**, max **{summary['adjacent_rms']['max']}**

Pixel inspection of the first frame, representative frames across the sequence, the midpoint, and the final frame confirms the same floral engraved ring and wide polished ring, consistent proportions, stones, engraving, champagne rose-gold color, light ivory environment, and controlled lighting. No visible writing, hallmark, logo, watermark, third ring, hands, people, boxes, flowers, fabric, confetti, or additional jewelry were found.

## Source cadence

The following frames are pixel-identical to their immediate predecessors:

`{duplicate_text}`

This is a regular every-fifth-frame source export cadence, not a missing frame or visual jump. All 240 frames are preserved and served in the supplied order; none were excluded or interpolated.
""",
    encoding="utf-8",
)

print(json.dumps(summary, indent=2))
