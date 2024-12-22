"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@floating-ui+utils@0.2.8";
exports.ids = ["vendor-chunks/@floating-ui+utils@0.2.8"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@floating-ui+utils@0.2.8/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@floating-ui+utils@0.2.8/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getComputedStyle: () => (/* binding */ getComputedStyle),\n/* harmony export */   getContainingBlock: () => (/* binding */ getContainingBlock),\n/* harmony export */   getDocumentElement: () => (/* binding */ getDocumentElement),\n/* harmony export */   getFrameElement: () => (/* binding */ getFrameElement),\n/* harmony export */   getNearestOverflowAncestor: () => (/* binding */ getNearestOverflowAncestor),\n/* harmony export */   getNodeName: () => (/* binding */ getNodeName),\n/* harmony export */   getNodeScroll: () => (/* binding */ getNodeScroll),\n/* harmony export */   getOverflowAncestors: () => (/* binding */ getOverflowAncestors),\n/* harmony export */   getParentNode: () => (/* binding */ getParentNode),\n/* harmony export */   getWindow: () => (/* binding */ getWindow),\n/* harmony export */   isContainingBlock: () => (/* binding */ isContainingBlock),\n/* harmony export */   isElement: () => (/* binding */ isElement),\n/* harmony export */   isHTMLElement: () => (/* binding */ isHTMLElement),\n/* harmony export */   isLastTraversableNode: () => (/* binding */ isLastTraversableNode),\n/* harmony export */   isNode: () => (/* binding */ isNode),\n/* harmony export */   isOverflowElement: () => (/* binding */ isOverflowElement),\n/* harmony export */   isShadowRoot: () => (/* binding */ isShadowRoot),\n/* harmony export */   isTableElement: () => (/* binding */ isTableElement),\n/* harmony export */   isTopLayer: () => (/* binding */ isTopLayer),\n/* harmony export */   isWebKit: () => (/* binding */ isWebKit)\n/* harmony export */ });\nfunction hasWindow() {\n  return typeof window !== 'undefined';\n}\nfunction getNodeName(node) {\n  if (isNode(node)) {\n    return (node.nodeName || '').toLowerCase();\n  }\n  // Mocked nodes in testing environments may not be instances of Node. By\n  // returning `#document` an infinite loop won't occur.\n  // https://github.com/floating-ui/floating-ui/issues/2317\n  return '#document';\n}\nfunction getWindow(node) {\n  var _node$ownerDocument;\n  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;\n}\nfunction getDocumentElement(node) {\n  var _ref;\n  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;\n}\nfunction isNode(value) {\n  if (!hasWindow()) {\n    return false;\n  }\n  return value instanceof Node || value instanceof getWindow(value).Node;\n}\nfunction isElement(value) {\n  if (!hasWindow()) {\n    return false;\n  }\n  return value instanceof Element || value instanceof getWindow(value).Element;\n}\nfunction isHTMLElement(value) {\n  if (!hasWindow()) {\n    return false;\n  }\n  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;\n}\nfunction isShadowRoot(value) {\n  if (!hasWindow() || typeof ShadowRoot === 'undefined') {\n    return false;\n  }\n  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;\n}\nfunction isOverflowElement(element) {\n  const {\n    overflow,\n    overflowX,\n    overflowY,\n    display\n  } = getComputedStyle(element);\n  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);\n}\nfunction isTableElement(element) {\n  return ['table', 'td', 'th'].includes(getNodeName(element));\n}\nfunction isTopLayer(element) {\n  return [':popover-open', ':modal'].some(selector => {\n    try {\n      return element.matches(selector);\n    } catch (e) {\n      return false;\n    }\n  });\n}\nfunction isContainingBlock(elementOrCss) {\n  const webkit = isWebKit();\n  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;\n\n  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block\n  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));\n}\nfunction getContainingBlock(element) {\n  let currentNode = getParentNode(element);\n  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {\n    if (isContainingBlock(currentNode)) {\n      return currentNode;\n    } else if (isTopLayer(currentNode)) {\n      return null;\n    }\n    currentNode = getParentNode(currentNode);\n  }\n  return null;\n}\nfunction isWebKit() {\n  if (typeof CSS === 'undefined' || !CSS.supports) return false;\n  return CSS.supports('-webkit-backdrop-filter', 'none');\n}\nfunction isLastTraversableNode(node) {\n  return ['html', 'body', '#document'].includes(getNodeName(node));\n}\nfunction getComputedStyle(element) {\n  return getWindow(element).getComputedStyle(element);\n}\nfunction getNodeScroll(element) {\n  if (isElement(element)) {\n    return {\n      scrollLeft: element.scrollLeft,\n      scrollTop: element.scrollTop\n    };\n  }\n  return {\n    scrollLeft: element.scrollX,\n    scrollTop: element.scrollY\n  };\n}\nfunction getParentNode(node) {\n  if (getNodeName(node) === 'html') {\n    return node;\n  }\n  const result =\n  // Step into the shadow DOM of the parent of a slotted node.\n  node.assignedSlot ||\n  // DOM Element detected.\n  node.parentNode ||\n  // ShadowRoot detected.\n  isShadowRoot(node) && node.host ||\n  // Fallback.\n  getDocumentElement(node);\n  return isShadowRoot(result) ? result.host : result;\n}\nfunction getNearestOverflowAncestor(node) {\n  const parentNode = getParentNode(node);\n  if (isLastTraversableNode(parentNode)) {\n    return node.ownerDocument ? node.ownerDocument.body : node.body;\n  }\n  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {\n    return parentNode;\n  }\n  return getNearestOverflowAncestor(parentNode);\n}\nfunction getOverflowAncestors(node, list, traverseIframes) {\n  var _node$ownerDocument2;\n  if (list === void 0) {\n    list = [];\n  }\n  if (traverseIframes === void 0) {\n    traverseIframes = true;\n  }\n  const scrollableAncestor = getNearestOverflowAncestor(node);\n  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);\n  const win = getWindow(scrollableAncestor);\n  if (isBody) {\n    const frameElement = getFrameElement(win);\n    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);\n  }\n  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));\n}\nfunction getFrameElement(win) {\n  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi44L25vZGVfbW9kdWxlcy9AZmxvYXRpbmctdWkvdXRpbHMvZGlzdC9mbG9hdGluZy11aS51dGlscy5kb20ubWpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVnViIsInNvdXJjZXMiOlsiL1VzZXJzL3dvanRlay9EZXNrdG9wL1Byb2plY3RzL0x5cmEvbm9kZV9tb2R1bGVzLy5wbnBtL0BmbG9hdGluZy11aSt1dGlsc0AwLjIuOC9ub2RlX21vZHVsZXMvQGZsb2F0aW5nLXVpL3V0aWxzL2Rpc3QvZmxvYXRpbmctdWkudXRpbHMuZG9tLm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBoYXNXaW5kb3coKSB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbn1cbmZ1bmN0aW9uIGdldE5vZGVOYW1lKG5vZGUpIHtcbiAgaWYgKGlzTm9kZShub2RlKSkge1xuICAgIHJldHVybiAobm9kZS5ub2RlTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgfVxuICAvLyBNb2NrZWQgbm9kZXMgaW4gdGVzdGluZyBlbnZpcm9ubWVudHMgbWF5IG5vdCBiZSBpbnN0YW5jZXMgb2YgTm9kZS4gQnlcbiAgLy8gcmV0dXJuaW5nIGAjZG9jdW1lbnRgIGFuIGluZmluaXRlIGxvb3Agd29uJ3Qgb2NjdXIuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mbG9hdGluZy11aS9mbG9hdGluZy11aS9pc3N1ZXMvMjMxN1xuICByZXR1cm4gJyNkb2N1bWVudCc7XG59XG5mdW5jdGlvbiBnZXRXaW5kb3cobm9kZSkge1xuICB2YXIgX25vZGUkb3duZXJEb2N1bWVudDtcbiAgcmV0dXJuIChub2RlID09IG51bGwgfHwgKF9ub2RlJG93bmVyRG9jdW1lbnQgPSBub2RlLm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfbm9kZSRvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KSB8fCB3aW5kb3c7XG59XG5mdW5jdGlvbiBnZXREb2N1bWVudEVsZW1lbnQobm9kZSkge1xuICB2YXIgX3JlZjtcbiAgcmV0dXJuIChfcmVmID0gKGlzTm9kZShub2RlKSA/IG5vZGUub3duZXJEb2N1bWVudCA6IG5vZGUuZG9jdW1lbnQpIHx8IHdpbmRvdy5kb2N1bWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9yZWYuZG9jdW1lbnRFbGVtZW50O1xufVxuZnVuY3Rpb24gaXNOb2RlKHZhbHVlKSB7XG4gIGlmICghaGFzV2luZG93KCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgTm9kZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIGdldFdpbmRvdyh2YWx1ZSkuTm9kZTtcbn1cbmZ1bmN0aW9uIGlzRWxlbWVudCh2YWx1ZSkge1xuICBpZiAoIWhhc1dpbmRvdygpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEVsZW1lbnQgfHwgdmFsdWUgaW5zdGFuY2VvZiBnZXRXaW5kb3codmFsdWUpLkVsZW1lbnQ7XG59XG5mdW5jdGlvbiBpc0hUTUxFbGVtZW50KHZhbHVlKSB7XG4gIGlmICghaGFzV2luZG93KCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgdmFsdWUgaW5zdGFuY2VvZiBnZXRXaW5kb3codmFsdWUpLkhUTUxFbGVtZW50O1xufVxuZnVuY3Rpb24gaXNTaGFkb3dSb290KHZhbHVlKSB7XG4gIGlmICghaGFzV2luZG93KCkgfHwgdHlwZW9mIFNoYWRvd1Jvb3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QgfHwgdmFsdWUgaW5zdGFuY2VvZiBnZXRXaW5kb3codmFsdWUpLlNoYWRvd1Jvb3Q7XG59XG5mdW5jdGlvbiBpc092ZXJmbG93RWxlbWVudChlbGVtZW50KSB7XG4gIGNvbnN0IHtcbiAgICBvdmVyZmxvdyxcbiAgICBvdmVyZmxvd1gsXG4gICAgb3ZlcmZsb3dZLFxuICAgIGRpc3BsYXlcbiAgfSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gIHJldHVybiAvYXV0b3xzY3JvbGx8b3ZlcmxheXxoaWRkZW58Y2xpcC8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCkgJiYgIVsnaW5saW5lJywgJ2NvbnRlbnRzJ10uaW5jbHVkZXMoZGlzcGxheSk7XG59XG5mdW5jdGlvbiBpc1RhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBbJ3RhYmxlJywgJ3RkJywgJ3RoJ10uaW5jbHVkZXMoZ2V0Tm9kZU5hbWUoZWxlbWVudCkpO1xufVxuZnVuY3Rpb24gaXNUb3BMYXllcihlbGVtZW50KSB7XG4gIHJldHVybiBbJzpwb3BvdmVyLW9wZW4nLCAnOm1vZGFsJ10uc29tZShzZWxlY3RvciA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gaXNDb250YWluaW5nQmxvY2soZWxlbWVudE9yQ3NzKSB7XG4gIGNvbnN0IHdlYmtpdCA9IGlzV2ViS2l0KCk7XG4gIGNvbnN0IGNzcyA9IGlzRWxlbWVudChlbGVtZW50T3JDc3MpID8gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50T3JDc3MpIDogZWxlbWVudE9yQ3NzO1xuXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9Db250YWluaW5nX2Jsb2NrI2lkZW50aWZ5aW5nX3RoZV9jb250YWluaW5nX2Jsb2NrXG4gIHJldHVybiBjc3MudHJhbnNmb3JtICE9PSAnbm9uZScgfHwgY3NzLnBlcnNwZWN0aXZlICE9PSAnbm9uZScgfHwgKGNzcy5jb250YWluZXJUeXBlID8gY3NzLmNvbnRhaW5lclR5cGUgIT09ICdub3JtYWwnIDogZmFsc2UpIHx8ICF3ZWJraXQgJiYgKGNzcy5iYWNrZHJvcEZpbHRlciA/IGNzcy5iYWNrZHJvcEZpbHRlciAhPT0gJ25vbmUnIDogZmFsc2UpIHx8ICF3ZWJraXQgJiYgKGNzcy5maWx0ZXIgPyBjc3MuZmlsdGVyICE9PSAnbm9uZScgOiBmYWxzZSkgfHwgWyd0cmFuc2Zvcm0nLCAncGVyc3BlY3RpdmUnLCAnZmlsdGVyJ10uc29tZSh2YWx1ZSA9PiAoY3NzLndpbGxDaGFuZ2UgfHwgJycpLmluY2x1ZGVzKHZhbHVlKSkgfHwgWydwYWludCcsICdsYXlvdXQnLCAnc3RyaWN0JywgJ2NvbnRlbnQnXS5zb21lKHZhbHVlID0+IChjc3MuY29udGFpbiB8fCAnJykuaW5jbHVkZXModmFsdWUpKTtcbn1cbmZ1bmN0aW9uIGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB7XG4gIGxldCBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG4gIHdoaWxlIChpc0hUTUxFbGVtZW50KGN1cnJlbnROb2RlKSAmJiAhaXNMYXN0VHJhdmVyc2FibGVOb2RlKGN1cnJlbnROb2RlKSkge1xuICAgIGlmIChpc0NvbnRhaW5pbmdCbG9jayhjdXJyZW50Tm9kZSkpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9IGVsc2UgaWYgKGlzVG9wTGF5ZXIoY3VycmVudE5vZGUpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY3VycmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGN1cnJlbnROb2RlKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGlzV2ViS2l0KCkge1xuICBpZiAodHlwZW9mIENTUyA9PT0gJ3VuZGVmaW5lZCcgfHwgIUNTUy5zdXBwb3J0cykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gQ1NTLnN1cHBvcnRzKCctd2Via2l0LWJhY2tkcm9wLWZpbHRlcicsICdub25lJyk7XG59XG5mdW5jdGlvbiBpc0xhc3RUcmF2ZXJzYWJsZU5vZGUobm9kZSkge1xuICByZXR1cm4gWydodG1sJywgJ2JvZHknLCAnI2RvY3VtZW50J10uaW5jbHVkZXMoZ2V0Tm9kZU5hbWUobm9kZSkpO1xufVxuZnVuY3Rpb24gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSB7XG4gIHJldHVybiBnZXRXaW5kb3coZWxlbWVudCkuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbn1cbmZ1bmN0aW9uIGdldE5vZGVTY3JvbGwoZWxlbWVudCkge1xuICBpZiAoaXNFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNjcm9sbExlZnQ6IGVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgIHNjcm9sbFRvcDogZWxlbWVudC5zY3JvbGxUb3BcbiAgICB9O1xuICB9XG4gIHJldHVybiB7XG4gICAgc2Nyb2xsTGVmdDogZWxlbWVudC5zY3JvbGxYLFxuICAgIHNjcm9sbFRvcDogZWxlbWVudC5zY3JvbGxZXG4gIH07XG59XG5mdW5jdGlvbiBnZXRQYXJlbnROb2RlKG5vZGUpIHtcbiAgaWYgKGdldE5vZGVOYW1lKG5vZGUpID09PSAnaHRtbCcpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBjb25zdCByZXN1bHQgPVxuICAvLyBTdGVwIGludG8gdGhlIHNoYWRvdyBET00gb2YgdGhlIHBhcmVudCBvZiBhIHNsb3R0ZWQgbm9kZS5cbiAgbm9kZS5hc3NpZ25lZFNsb3QgfHxcbiAgLy8gRE9NIEVsZW1lbnQgZGV0ZWN0ZWQuXG4gIG5vZGUucGFyZW50Tm9kZSB8fFxuICAvLyBTaGFkb3dSb290IGRldGVjdGVkLlxuICBpc1NoYWRvd1Jvb3Qobm9kZSkgJiYgbm9kZS5ob3N0IHx8XG4gIC8vIEZhbGxiYWNrLlxuICBnZXREb2N1bWVudEVsZW1lbnQobm9kZSk7XG4gIHJldHVybiBpc1NoYWRvd1Jvb3QocmVzdWx0KSA/IHJlc3VsdC5ob3N0IDogcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2V0TmVhcmVzdE92ZXJmbG93QW5jZXN0b3Iobm9kZSkge1xuICBjb25zdCBwYXJlbnROb2RlID0gZ2V0UGFyZW50Tm9kZShub2RlKTtcbiAgaWYgKGlzTGFzdFRyYXZlcnNhYmxlTm9kZShwYXJlbnROb2RlKSkge1xuICAgIHJldHVybiBub2RlLm93bmVyRG9jdW1lbnQgPyBub2RlLm93bmVyRG9jdW1lbnQuYm9keSA6IG5vZGUuYm9keTtcbiAgfVxuICBpZiAoaXNIVE1MRWxlbWVudChwYXJlbnROb2RlKSAmJiBpc092ZXJmbG93RWxlbWVudChwYXJlbnROb2RlKSkge1xuICAgIHJldHVybiBwYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBnZXROZWFyZXN0T3ZlcmZsb3dBbmNlc3RvcihwYXJlbnROb2RlKTtcbn1cbmZ1bmN0aW9uIGdldE92ZXJmbG93QW5jZXN0b3JzKG5vZGUsIGxpc3QsIHRyYXZlcnNlSWZyYW1lcykge1xuICB2YXIgX25vZGUkb3duZXJEb2N1bWVudDI7XG4gIGlmIChsaXN0ID09PSB2b2lkIDApIHtcbiAgICBsaXN0ID0gW107XG4gIH1cbiAgaWYgKHRyYXZlcnNlSWZyYW1lcyA9PT0gdm9pZCAwKSB7XG4gICAgdHJhdmVyc2VJZnJhbWVzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzY3JvbGxhYmxlQW5jZXN0b3IgPSBnZXROZWFyZXN0T3ZlcmZsb3dBbmNlc3Rvcihub2RlKTtcbiAgY29uc3QgaXNCb2R5ID0gc2Nyb2xsYWJsZUFuY2VzdG9yID09PSAoKF9ub2RlJG93bmVyRG9jdW1lbnQyID0gbm9kZS5vd25lckRvY3VtZW50KSA9PSBudWxsID8gdm9pZCAwIDogX25vZGUkb3duZXJEb2N1bWVudDIuYm9keSk7XG4gIGNvbnN0IHdpbiA9IGdldFdpbmRvdyhzY3JvbGxhYmxlQW5jZXN0b3IpO1xuICBpZiAoaXNCb2R5KSB7XG4gICAgY29uc3QgZnJhbWVFbGVtZW50ID0gZ2V0RnJhbWVFbGVtZW50KHdpbik7XG4gICAgcmV0dXJuIGxpc3QuY29uY2F0KHdpbiwgd2luLnZpc3VhbFZpZXdwb3J0IHx8IFtdLCBpc092ZXJmbG93RWxlbWVudChzY3JvbGxhYmxlQW5jZXN0b3IpID8gc2Nyb2xsYWJsZUFuY2VzdG9yIDogW10sIGZyYW1lRWxlbWVudCAmJiB0cmF2ZXJzZUlmcmFtZXMgPyBnZXRPdmVyZmxvd0FuY2VzdG9ycyhmcmFtZUVsZW1lbnQpIDogW10pO1xuICB9XG4gIHJldHVybiBsaXN0LmNvbmNhdChzY3JvbGxhYmxlQW5jZXN0b3IsIGdldE92ZXJmbG93QW5jZXN0b3JzKHNjcm9sbGFibGVBbmNlc3RvciwgW10sIHRyYXZlcnNlSWZyYW1lcykpO1xufVxuZnVuY3Rpb24gZ2V0RnJhbWVFbGVtZW50KHdpbikge1xuICByZXR1cm4gd2luLnBhcmVudCAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2luLnBhcmVudCkgPyB3aW4uZnJhbWVFbGVtZW50IDogbnVsbDtcbn1cblxuZXhwb3J0IHsgZ2V0Q29tcHV0ZWRTdHlsZSwgZ2V0Q29udGFpbmluZ0Jsb2NrLCBnZXREb2N1bWVudEVsZW1lbnQsIGdldEZyYW1lRWxlbWVudCwgZ2V0TmVhcmVzdE92ZXJmbG93QW5jZXN0b3IsIGdldE5vZGVOYW1lLCBnZXROb2RlU2Nyb2xsLCBnZXRPdmVyZmxvd0FuY2VzdG9ycywgZ2V0UGFyZW50Tm9kZSwgZ2V0V2luZG93LCBpc0NvbnRhaW5pbmdCbG9jaywgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50LCBpc0xhc3RUcmF2ZXJzYWJsZU5vZGUsIGlzTm9kZSwgaXNPdmVyZmxvd0VsZW1lbnQsIGlzU2hhZG93Um9vdCwgaXNUYWJsZUVsZW1lbnQsIGlzVG9wTGF5ZXIsIGlzV2ViS2l0IH07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@floating-ui+utils@0.2.8/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/@floating-ui+utils@0.2.8/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@floating-ui+utils@0.2.8/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   alignments: () => (/* binding */ alignments),\n/* harmony export */   clamp: () => (/* binding */ clamp),\n/* harmony export */   createCoords: () => (/* binding */ createCoords),\n/* harmony export */   evaluate: () => (/* binding */ evaluate),\n/* harmony export */   expandPaddingObject: () => (/* binding */ expandPaddingObject),\n/* harmony export */   floor: () => (/* binding */ floor),\n/* harmony export */   getAlignment: () => (/* binding */ getAlignment),\n/* harmony export */   getAlignmentAxis: () => (/* binding */ getAlignmentAxis),\n/* harmony export */   getAlignmentSides: () => (/* binding */ getAlignmentSides),\n/* harmony export */   getAxisLength: () => (/* binding */ getAxisLength),\n/* harmony export */   getExpandedPlacements: () => (/* binding */ getExpandedPlacements),\n/* harmony export */   getOppositeAlignmentPlacement: () => (/* binding */ getOppositeAlignmentPlacement),\n/* harmony export */   getOppositeAxis: () => (/* binding */ getOppositeAxis),\n/* harmony export */   getOppositeAxisPlacements: () => (/* binding */ getOppositeAxisPlacements),\n/* harmony export */   getOppositePlacement: () => (/* binding */ getOppositePlacement),\n/* harmony export */   getPaddingObject: () => (/* binding */ getPaddingObject),\n/* harmony export */   getSide: () => (/* binding */ getSide),\n/* harmony export */   getSideAxis: () => (/* binding */ getSideAxis),\n/* harmony export */   max: () => (/* binding */ max),\n/* harmony export */   min: () => (/* binding */ min),\n/* harmony export */   placements: () => (/* binding */ placements),\n/* harmony export */   rectToClientRect: () => (/* binding */ rectToClientRect),\n/* harmony export */   round: () => (/* binding */ round),\n/* harmony export */   sides: () => (/* binding */ sides)\n/* harmony export */ });\n/**\n * Custom positioning reference element.\n * @see https://floating-ui.com/docs/virtual-elements\n */\n\nconst sides = ['top', 'right', 'bottom', 'left'];\nconst alignments = ['start', 'end'];\nconst placements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + \"-\" + alignments[0], side + \"-\" + alignments[1]), []);\nconst min = Math.min;\nconst max = Math.max;\nconst round = Math.round;\nconst floor = Math.floor;\nconst createCoords = v => ({\n  x: v,\n  y: v\n});\nconst oppositeSideMap = {\n  left: 'right',\n  right: 'left',\n  bottom: 'top',\n  top: 'bottom'\n};\nconst oppositeAlignmentMap = {\n  start: 'end',\n  end: 'start'\n};\nfunction clamp(start, value, end) {\n  return max(start, min(value, end));\n}\nfunction evaluate(value, param) {\n  return typeof value === 'function' ? value(param) : value;\n}\nfunction getSide(placement) {\n  return placement.split('-')[0];\n}\nfunction getAlignment(placement) {\n  return placement.split('-')[1];\n}\nfunction getOppositeAxis(axis) {\n  return axis === 'x' ? 'y' : 'x';\n}\nfunction getAxisLength(axis) {\n  return axis === 'y' ? 'height' : 'width';\n}\nfunction getSideAxis(placement) {\n  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';\n}\nfunction getAlignmentAxis(placement) {\n  return getOppositeAxis(getSideAxis(placement));\n}\nfunction getAlignmentSides(placement, rects, rtl) {\n  if (rtl === void 0) {\n    rtl = false;\n  }\n  const alignment = getAlignment(placement);\n  const alignmentAxis = getAlignmentAxis(placement);\n  const length = getAxisLength(alignmentAxis);\n  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';\n  if (rects.reference[length] > rects.floating[length]) {\n    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);\n  }\n  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];\n}\nfunction getExpandedPlacements(placement) {\n  const oppositePlacement = getOppositePlacement(placement);\n  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];\n}\nfunction getOppositeAlignmentPlacement(placement) {\n  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);\n}\nfunction getSideList(side, isStart, rtl) {\n  const lr = ['left', 'right'];\n  const rl = ['right', 'left'];\n  const tb = ['top', 'bottom'];\n  const bt = ['bottom', 'top'];\n  switch (side) {\n    case 'top':\n    case 'bottom':\n      if (rtl) return isStart ? rl : lr;\n      return isStart ? lr : rl;\n    case 'left':\n    case 'right':\n      return isStart ? tb : bt;\n    default:\n      return [];\n  }\n}\nfunction getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {\n  const alignment = getAlignment(placement);\n  let list = getSideList(getSide(placement), direction === 'start', rtl);\n  if (alignment) {\n    list = list.map(side => side + \"-\" + alignment);\n    if (flipAlignment) {\n      list = list.concat(list.map(getOppositeAlignmentPlacement));\n    }\n  }\n  return list;\n}\nfunction getOppositePlacement(placement) {\n  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);\n}\nfunction expandPaddingObject(padding) {\n  return {\n    top: 0,\n    right: 0,\n    bottom: 0,\n    left: 0,\n    ...padding\n  };\n}\nfunction getPaddingObject(padding) {\n  return typeof padding !== 'number' ? expandPaddingObject(padding) : {\n    top: padding,\n    right: padding,\n    bottom: padding,\n    left: padding\n  };\n}\nfunction rectToClientRect(rect) {\n  const {\n    x,\n    y,\n    width,\n    height\n  } = rect;\n  return {\n    width,\n    height,\n    top: y,\n    left: x,\n    right: x + width,\n    bottom: y + height,\n    x,\n    y\n  };\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi44L25vZGVfbW9kdWxlcy9AZmxvYXRpbmctdWkvdXRpbHMvZGlzdC9mbG9hdGluZy11aS51dGlscy5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXlXIiwic291cmNlcyI6WyIvVXNlcnMvd29qdGVrL0Rlc2t0b3AvUHJvamVjdHMvTHlyYS9ub2RlX21vZHVsZXMvLnBucG0vQGZsb2F0aW5nLXVpK3V0aWxzQDAuMi44L25vZGVfbW9kdWxlcy9AZmxvYXRpbmctdWkvdXRpbHMvZGlzdC9mbG9hdGluZy11aS51dGlscy5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDdXN0b20gcG9zaXRpb25pbmcgcmVmZXJlbmNlIGVsZW1lbnQuXG4gKiBAc2VlIGh0dHBzOi8vZmxvYXRpbmctdWkuY29tL2RvY3MvdmlydHVhbC1lbGVtZW50c1xuICovXG5cbmNvbnN0IHNpZGVzID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXTtcbmNvbnN0IGFsaWdubWVudHMgPSBbJ3N0YXJ0JywgJ2VuZCddO1xuY29uc3QgcGxhY2VtZW50cyA9IC8qI19fUFVSRV9fKi9zaWRlcy5yZWR1Y2UoKGFjYywgc2lkZSkgPT4gYWNjLmNvbmNhdChzaWRlLCBzaWRlICsgXCItXCIgKyBhbGlnbm1lbnRzWzBdLCBzaWRlICsgXCItXCIgKyBhbGlnbm1lbnRzWzFdKSwgW10pO1xuY29uc3QgbWluID0gTWF0aC5taW47XG5jb25zdCBtYXggPSBNYXRoLm1heDtcbmNvbnN0IHJvdW5kID0gTWF0aC5yb3VuZDtcbmNvbnN0IGZsb29yID0gTWF0aC5mbG9vcjtcbmNvbnN0IGNyZWF0ZUNvb3JkcyA9IHYgPT4gKHtcbiAgeDogdixcbiAgeTogdlxufSk7XG5jb25zdCBvcHBvc2l0ZVNpZGVNYXAgPSB7XG4gIGxlZnQ6ICdyaWdodCcsXG4gIHJpZ2h0OiAnbGVmdCcsXG4gIGJvdHRvbTogJ3RvcCcsXG4gIHRvcDogJ2JvdHRvbSdcbn07XG5jb25zdCBvcHBvc2l0ZUFsaWdubWVudE1hcCA9IHtcbiAgc3RhcnQ6ICdlbmQnLFxuICBlbmQ6ICdzdGFydCdcbn07XG5mdW5jdGlvbiBjbGFtcChzdGFydCwgdmFsdWUsIGVuZCkge1xuICByZXR1cm4gbWF4KHN0YXJ0LCBtaW4odmFsdWUsIGVuZCkpO1xufVxuZnVuY3Rpb24gZXZhbHVhdGUodmFsdWUsIHBhcmFtKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZShwYXJhbSkgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGdldFNpZGUocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbn1cbmZ1bmN0aW9uIGdldEFsaWdubWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzFdO1xufVxuZnVuY3Rpb24gZ2V0T3Bwb3NpdGVBeGlzKGF4aXMpIHtcbiAgcmV0dXJuIGF4aXMgPT09ICd4JyA/ICd5JyA6ICd4Jztcbn1cbmZ1bmN0aW9uIGdldEF4aXNMZW5ndGgoYXhpcykge1xuICByZXR1cm4gYXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xufVxuZnVuY3Rpb24gZ2V0U2lkZUF4aXMocGxhY2VtZW50KSB7XG4gIHJldHVybiBbJ3RvcCcsICdib3R0b20nXS5pbmNsdWRlcyhnZXRTaWRlKHBsYWNlbWVudCkpID8gJ3knIDogJ3gnO1xufVxuZnVuY3Rpb24gZ2V0QWxpZ25tZW50QXhpcyhwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGdldE9wcG9zaXRlQXhpcyhnZXRTaWRlQXhpcyhwbGFjZW1lbnQpKTtcbn1cbmZ1bmN0aW9uIGdldEFsaWdubWVudFNpZGVzKHBsYWNlbWVudCwgcmVjdHMsIHJ0bCkge1xuICBpZiAocnRsID09PSB2b2lkIDApIHtcbiAgICBydGwgPSBmYWxzZTtcbiAgfVxuICBjb25zdCBhbGlnbm1lbnQgPSBnZXRBbGlnbm1lbnQocGxhY2VtZW50KTtcbiAgY29uc3QgYWxpZ25tZW50QXhpcyA9IGdldEFsaWdubWVudEF4aXMocGxhY2VtZW50KTtcbiAgY29uc3QgbGVuZ3RoID0gZ2V0QXhpc0xlbmd0aChhbGlnbm1lbnRBeGlzKTtcbiAgbGV0IG1haW5BbGlnbm1lbnRTaWRlID0gYWxpZ25tZW50QXhpcyA9PT0gJ3gnID8gYWxpZ25tZW50ID09PSAocnRsID8gJ2VuZCcgOiAnc3RhcnQnKSA/ICdyaWdodCcgOiAnbGVmdCcgOiBhbGlnbm1lbnQgPT09ICdzdGFydCcgPyAnYm90dG9tJyA6ICd0b3AnO1xuICBpZiAocmVjdHMucmVmZXJlbmNlW2xlbmd0aF0gPiByZWN0cy5mbG9hdGluZ1tsZW5ndGhdKSB7XG4gICAgbWFpbkFsaWdubWVudFNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluQWxpZ25tZW50U2lkZSk7XG4gIH1cbiAgcmV0dXJuIFttYWluQWxpZ25tZW50U2lkZSwgZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpbkFsaWdubWVudFNpZGUpXTtcbn1cbmZ1bmN0aW9uIGdldEV4cGFuZGVkUGxhY2VtZW50cyhwbGFjZW1lbnQpIHtcbiAgY29uc3Qgb3Bwb3NpdGVQbGFjZW1lbnQgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICByZXR1cm4gW2dldE9wcG9zaXRlQWxpZ25tZW50UGxhY2VtZW50KHBsYWNlbWVudCksIG9wcG9zaXRlUGxhY2VtZW50LCBnZXRPcHBvc2l0ZUFsaWdubWVudFBsYWNlbWVudChvcHBvc2l0ZVBsYWNlbWVudCldO1xufVxuZnVuY3Rpb24gZ2V0T3Bwb3NpdGVBbGlnbm1lbnRQbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQucmVwbGFjZSgvc3RhcnR8ZW5kL2csIGFsaWdubWVudCA9PiBvcHBvc2l0ZUFsaWdubWVudE1hcFthbGlnbm1lbnRdKTtcbn1cbmZ1bmN0aW9uIGdldFNpZGVMaXN0KHNpZGUsIGlzU3RhcnQsIHJ0bCkge1xuICBjb25zdCBsciA9IFsnbGVmdCcsICdyaWdodCddO1xuICBjb25zdCBybCA9IFsncmlnaHQnLCAnbGVmdCddO1xuICBjb25zdCB0YiA9IFsndG9wJywgJ2JvdHRvbSddO1xuICBjb25zdCBidCA9IFsnYm90dG9tJywgJ3RvcCddO1xuICBzd2l0Y2ggKHNpZGUpIHtcbiAgICBjYXNlICd0b3AnOlxuICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICBpZiAocnRsKSByZXR1cm4gaXNTdGFydCA/IHJsIDogbHI7XG4gICAgICByZXR1cm4gaXNTdGFydCA/IGxyIDogcmw7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgY2FzZSAncmlnaHQnOlxuICAgICAgcmV0dXJuIGlzU3RhcnQgPyB0YiA6IGJ0O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gW107XG4gIH1cbn1cbmZ1bmN0aW9uIGdldE9wcG9zaXRlQXhpc1BsYWNlbWVudHMocGxhY2VtZW50LCBmbGlwQWxpZ25tZW50LCBkaXJlY3Rpb24sIHJ0bCkge1xuICBjb25zdCBhbGlnbm1lbnQgPSBnZXRBbGlnbm1lbnQocGxhY2VtZW50KTtcbiAgbGV0IGxpc3QgPSBnZXRTaWRlTGlzdChnZXRTaWRlKHBsYWNlbWVudCksIGRpcmVjdGlvbiA9PT0gJ3N0YXJ0JywgcnRsKTtcbiAgaWYgKGFsaWdubWVudCkge1xuICAgIGxpc3QgPSBsaXN0Lm1hcChzaWRlID0+IHNpZGUgKyBcIi1cIiArIGFsaWdubWVudCk7XG4gICAgaWYgKGZsaXBBbGlnbm1lbnQpIHtcbiAgICAgIGxpc3QgPSBsaXN0LmNvbmNhdChsaXN0Lm1hcChnZXRPcHBvc2l0ZUFsaWdubWVudFBsYWNlbWVudCkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbGlzdDtcbn1cbmZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBzaWRlID0+IG9wcG9zaXRlU2lkZU1hcFtzaWRlXSk7XG59XG5mdW5jdGlvbiBleHBhbmRQYWRkaW5nT2JqZWN0KHBhZGRpbmcpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgLi4ucGFkZGluZ1xuICB9O1xufVxuZnVuY3Rpb24gZ2V0UGFkZGluZ09iamVjdChwYWRkaW5nKSB7XG4gIHJldHVybiB0eXBlb2YgcGFkZGluZyAhPT0gJ251bWJlcicgPyBleHBhbmRQYWRkaW5nT2JqZWN0KHBhZGRpbmcpIDoge1xuICAgIHRvcDogcGFkZGluZyxcbiAgICByaWdodDogcGFkZGluZyxcbiAgICBib3R0b206IHBhZGRpbmcsXG4gICAgbGVmdDogcGFkZGluZ1xuICB9O1xufVxuZnVuY3Rpb24gcmVjdFRvQ2xpZW50UmVjdChyZWN0KSB7XG4gIGNvbnN0IHtcbiAgICB4LFxuICAgIHksXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0XG4gIH0gPSByZWN0O1xuICByZXR1cm4ge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICB0b3A6IHksXG4gICAgbGVmdDogeCxcbiAgICByaWdodDogeCArIHdpZHRoLFxuICAgIGJvdHRvbTogeSArIGhlaWdodCxcbiAgICB4LFxuICAgIHlcbiAgfTtcbn1cblxuZXhwb3J0IHsgYWxpZ25tZW50cywgY2xhbXAsIGNyZWF0ZUNvb3JkcywgZXZhbHVhdGUsIGV4cGFuZFBhZGRpbmdPYmplY3QsIGZsb29yLCBnZXRBbGlnbm1lbnQsIGdldEFsaWdubWVudEF4aXMsIGdldEFsaWdubWVudFNpZGVzLCBnZXRBeGlzTGVuZ3RoLCBnZXRFeHBhbmRlZFBsYWNlbWVudHMsIGdldE9wcG9zaXRlQWxpZ25tZW50UGxhY2VtZW50LCBnZXRPcHBvc2l0ZUF4aXMsIGdldE9wcG9zaXRlQXhpc1BsYWNlbWVudHMsIGdldE9wcG9zaXRlUGxhY2VtZW50LCBnZXRQYWRkaW5nT2JqZWN0LCBnZXRTaWRlLCBnZXRTaWRlQXhpcywgbWF4LCBtaW4sIHBsYWNlbWVudHMsIHJlY3RUb0NsaWVudFJlY3QsIHJvdW5kLCBzaWRlcyB9O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@floating-ui+utils@0.2.8/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs\n");

/***/ })

};
;