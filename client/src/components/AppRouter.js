import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { authRoutes, nonAuthRoutes } from '../routes';
import { MAIN_ROUTE } from '../utils/constants';
import {Context} from '../index'
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    
    return (
       <Switch>
{user.isAuth && authRoutes.map(

({path, Component}) => <Route key={path} path={path} component={Component} exact />)}

{nonAuthRoutes.map(

({path, Component}) => <Route key={path} path={path} component={Component} exact />)}

<Redirect to={MAIN_ROUTE} />
       </Switch>
    )
})

export default AppRouter