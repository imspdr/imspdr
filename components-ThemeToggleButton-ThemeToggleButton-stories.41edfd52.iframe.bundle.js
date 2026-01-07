"use strict";(self.webpackChunk_imspdr_ui=self.webpackChunk_imspdr_ui||[]).push([[887],{"./src/components/ThemeToggleButton/ThemeToggleButton.stories.tsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ThemeToggleButton_stories});var react=__webpack_require__("./node_modules/react/index.js"),hi2=__webpack_require__("./node_modules/react-icons/hi2/index.mjs"),ThemeProvider=__webpack_require__("./src/components/ThemeToggleButton/ThemeProvider.tsx"),emotion_styled_base_browser_esm=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");const raise=emotion_react_browser_esm.i7`
  from {
    opacity: 0;
    top: 25px;
    right: 22px;
    transform: rotate(-45deg);
  }
  to {
    opacity: 1;
    top: 12px;
    right: 12px;
    transform: rotate(0deg);
  }
`,down=emotion_react_browser_esm.i7`
  from {
    opacity: 1;
    top: 12px;
    right: 12px;
    transform: rotate(0deg);
  }
  to {
    opacity: 0;
    top: 25px;
    right: 2px;
    transform: rotate(45deg);
  }
`,Container=(0,emotion_styled_base_browser_esm.A)("div",{target:"ehafjge3"})({name:"180f0v1",styles:"position:relative;height:48px;width:48px;z-index:10;cursor:pointer;display:flex;justify-content:center;align-items:center;border-radius:50%;transition:background-color 0.2s;&:hover{background-color:var(--imspdr-background-bg2);}"}),IconBase=(0,emotion_styled_base_browser_esm.A)("div",{target:"ehafjge2"})("position:absolute;width:24px;height:24px;display:flex;justify-content:center;align-items:center;opacity:",props=>props.isVisible?1:0,";top:",props=>props.isVisible?"12px":"25px",";right:",props=>props.isVisible?"12px":props.isRaising?"22px":"2px",";animation:",props=>props.disableAnimation?"none":props.isRaising?raise:down," 0.5s ease-out;color:var(--imspdr-foreground-fg1);svg{width:100%;height:100%;}"),SunIcon=(0,emotion_styled_base_browser_esm.A)(IconBase,{target:"ehafjge1"})(""),MoonIcon=(0,emotion_styled_base_browser_esm.A)(IconBase,{target:"ehafjge0"})("");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ThemeToggleButton_ThemeToggleButton=()=>{const{mode,toggleTheme}=(0,ThemeProvider.DP)(),[isFirstRender,setIsFirstRender]=(0,react.useState)(!0);(0,react.useEffect)(()=>{setIsFirstRender(!1)},[]);const isDark="dark"===mode;return(0,jsx_runtime.jsxs)(Container,{onClick:toggleTheme,children:[(0,jsx_runtime.jsx)(SunIcon,{isVisible:!isDark,isRaising:!isDark,disableAnimation:isFirstRender,children:(0,jsx_runtime.jsx)(hi2.Q3K,{})}),(0,jsx_runtime.jsx)(MoonIcon,{isVisible:isDark,isRaising:isDark,disableAnimation:isFirstRender,children:(0,jsx_runtime.jsx)(hi2.Zt5,{})})]})};ThemeToggleButton_ThemeToggleButton.displayName="ThemeToggleButton";try{ThemeToggleButton_ThemeToggleButton.displayName="ThemeToggleButton",ThemeToggleButton_ThemeToggleButton.__docgenInfo={description:"",displayName:"ThemeToggleButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ThemeToggleButton/index.tsx#ThemeToggleButton"]={docgenInfo:ThemeToggleButton_ThemeToggleButton.__docgenInfo,name:"ThemeToggleButton",path:"src/components/ThemeToggleButton/index.tsx#ThemeToggleButton"})}catch(__react_docgen_typescript_loader_error){}const ThemeToggleButton_stories={title:"Components/ThemeToggleButton",component:ThemeToggleButton_ThemeToggleButton},Default=()=>(0,jsx_runtime.jsx)(ThemeToggleButton_ThemeToggleButton,{});Default.displayName="Default",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => <ThemeToggleButton />",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"];try{ThemeToggleButton.displayName="ThemeToggleButton",ThemeToggleButton.__docgenInfo={description:"",displayName:"ThemeToggleButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ThemeToggleButton/ThemeToggleButton.stories.tsx#ThemeToggleButton"]={docgenInfo:ThemeToggleButton.__docgenInfo,name:"ThemeToggleButton",path:"src/components/ThemeToggleButton/ThemeToggleButton.stories.tsx#ThemeToggleButton"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-ThemeToggleButton-ThemeToggleButton-stories.41edfd52.iframe.bundle.js.map