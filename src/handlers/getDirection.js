export function getDirection(targetEl, eventPos) {
  if (eventPos < targetEl.centerZoneFrom) {
    return -1
  } else if (eventPos > targetEl.centerZoneTo) {
    return 1
  } else {
    return 0
  }
}
