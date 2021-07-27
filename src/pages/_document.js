import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { theme } from '../utils/themeProvider';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          {/*BEGIN GROOVE WIDGET CODE*/}
          <script
            dangerouslySetInnerHTML={{
            __html: `
                      !function(e,t){if(!e.groove){var i=function(e,t){return Array.prototype.slice.call(e,t)},a={widget:null,loadedWidgets:{},classes:{Shim:null,Embeddable:function(){this._beforeLoadCallQueue=[],this.shim=null,this.finalized=!1;var e=function(e){var t=i(arguments,1);if(this.finalized){if(!this[e])throw new TypeError(e+"() is not a valid widget method");this[e].apply(this,t)}else this._beforeLoadCallQueue.push([e,t])};this.initializeShim=function(){a.classes.Shim&&(this.shim=new a.classes.Shim(this))},this.exec=e,this.init=function(){e.apply(this,["init"].concat(i(arguments,0))),this.initializeShim()},this.onShimScriptLoad=this.initializeShim.bind(this),this.onload=void 0}},scriptLoader:{callbacks:{},states:{},load:function(e,i){if("pending"!==this.states[e]){this.states[e]="pending";var a=t.createElement("script");a.id=e,a.type="text/javascript",a.async=!0,a.src=i;var s=this;a.addEventListener("load",(function(){s.states[e]="completed",(s.callbacks[e]||[]).forEach((function(e){e()}))}),!1);var n=t.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n)}},addListener:function(e,t){"completed"!==this.states[e]?(this.callbacks[e]||(this.callbacks[e]=[]),this.callbacks[e].push(t)):t()}},createEmbeddable:function(){var t=new a.classes.Embeddable;return e.Proxy?new Proxy(t,{get:function(e,t){return e instanceof a.classes.Embeddable?Object.prototype.hasOwnProperty.call(e,t)||"onload"===t?e[t]:function(){e.exec.apply(e,[t].concat(i(arguments,0)))}:e[t]}}):t},createWidget:function(){var e=a.createEmbeddable();return a.scriptLoader.load("groove-script","https://265d971b-dc5f-4814-ae42-138fd86da16d.widget.cluster.groovehq.com/api/loader"),a.scriptLoader.addListener("groove-iframe-shim-loader",e.onShimScriptLoad),e}};e.groove=a}}(window,document);
    window.groove.widget = window.groove.createWidget();
    window.groove.widget.init('265d971b-dc5f-4814-ae42-138fd86da16d', {});
                  `,
          }} defer>
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};