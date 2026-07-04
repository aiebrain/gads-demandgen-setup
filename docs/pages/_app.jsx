// Nextra 3 requires the theme stylesheet to be imported explicitly (unlike v2,
// which injected it automatically). Without this the site renders unstyled.
import 'nextra-theme-docs/style.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
