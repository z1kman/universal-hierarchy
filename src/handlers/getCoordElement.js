export function getCoordElement(element) {
  const coordinateElement = element.getBoundingClientRect()
  const startPositionElement = coordinateElement.y
  const endPositionElement = coordinateElement.height + coordinateElement.y
  const heightOfElement = coordinateElement.height
  const midOfLemenet = startPositionElement + heightOfElement / 2
  const centralAreaCoverage = heightOfElement / 3
  const centerZoneFrom = midOfLemenet - centralAreaCoverage
  const centerZoneTo = midOfLemenet + centralAreaCoverage

  return {
    start: startPositionElement,
    end: endPositionElement,
    height: heightOfElement,
    centerZoneFrom: centerZoneFrom,
    centerZoneTo: centerZoneTo,
  }
}
