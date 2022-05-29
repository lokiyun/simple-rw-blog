import { AuthProvider } from '@redwoodjs/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { ThemeProvider } from 'styled-components'
import { RecoilRoot } from 'recoil'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'
import { LightTheme } from './utils/themes'
import GlobalStyle from './utils/GlobalStyle'
import Loading from './components/Loading/Loading'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth">
        <RedwoodApolloProvider>
          <RecoilRoot>
            <GlobalStyle />
            <ThemeProvider theme={LightTheme}>
              <Routes />
            </ThemeProvider>
            <Loading />
          </RecoilRoot>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
