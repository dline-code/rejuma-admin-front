import React, { Suspense, useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { AuthContext } from 'src/contexts/AuthContext'

function CustomRoute({ isPrivate = true, ...rest }) {
  const { authenticated } = useContext(AuthContext)
  if (isPrivate && !authenticated) {
    return <Redirect to={'/login'} />
  }
  return <Route {...rest} />
}

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <CustomRoute
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to="/login" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
