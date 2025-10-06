"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixedTemplate = exports.defaultTemplate = void 0;
var defaultTemplate = function (_a, _b) {
    var jsx = _a.jsx, componentName = _a.componentName;
    var tpl = _b.tpl;
    return tpl(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  import * as React from \"react\"\n\n  import type { IconProps } from \"../types\"\n\n  const ", " = React.forwardRef<SVGSVGElement, IconProps>(({ color = \"currentColor\", ...props }, ref) => {\n    return (\n      ", "\n    )\n  })\n  ", ".displayName = \"", "\"\n\n  export default ", "\n  "], ["\n  import * as React from \"react\"\n\n  import type { IconProps } from \"../types\"\n\n  const ", " = React.forwardRef<SVGSVGElement, IconProps>(({ color = \"currentColor\", ...props }, ref) => {\n    return (\n      ", "\n    )\n  })\n  ", ".displayName = \"", "\"\n\n  export default ", "\n  "])), componentName, jsx, componentName, componentName, componentName);
};
exports.defaultTemplate = defaultTemplate;
var fixedTemplate = function (_a, _b) {
    var jsx = _a.jsx, componentName = _a.componentName;
    var tpl = _b.tpl;
    return tpl(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  import * as React from \"react\"\n\n  import type { IconProps } from \"../types\"\n\n  const ", " = React.forwardRef<SVGSVGElement, Omit<IconProps, \"color\">>((props, ref) => {\n    return (\n      ", "\n    )\n  })\n  ", ".displayName = \"", "\"\n\n  export default ", "\n  "], ["\n  import * as React from \"react\"\n\n  import type { IconProps } from \"../types\"\n\n  const ", " = React.forwardRef<SVGSVGElement, Omit<IconProps, \"color\">>((props, ref) => {\n    return (\n      ", "\n    )\n  })\n  ", ".displayName = \"", "\"\n\n  export default ", "\n  "])), componentName, jsx, componentName, componentName, componentName);
};
exports.fixedTemplate = fixedTemplate;
var templateObject_1, templateObject_2;
