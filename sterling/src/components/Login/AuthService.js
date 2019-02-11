import auth0 from 'auth0-js'
import router from '../../router'
import Vue from 'vue'
import * as constant from "../constant/constant";



export default {
    auth0: new auth0.WebAuth({
        domain: 'ekryp.auth0.com',
        clientID: 'NJh7jJsES1ymojwuBodeZJCzT867UNiu',
        redirectUri: constant.APPURL + 'callback',
        responseType: 'token id_token',
        scope: 'openid'
    }),
    handleAuthentication() {
        console.log('callback')
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.getUserInfo(authResult)
                // this.setSession(authResult)
                console.log('success')
                // router.push('/dashboard')
            } else if (err) {
                router.push('/')
                console.log(err)
            }
        })
    },
    getUserInfo(authResult) {
        console.log('authResult ----->', authResult.idTokenPayload.sub)
        fetch('https://ekryp.auth0.com/api/v2/users/' + authResult.idTokenPayload.sub, {
            headers: {
                Authorization: "Bearer " + authResult.idToken
            }
        }).then(function (responseData) {
            responseData.text().then(response => {
                console.log('response ----->', JSON.parse(response))
                let expiresAt = JSON.stringify(authResult.expiresIn)
                localStorage.setItem('auth0_access_token', authResult.accessToken)
                localStorage.setItem('auth0_id_token', authResult.idToken)
                localStorage.setItem('auth0_expires_at', expiresAt)
                var profile = JSON.parse(response)
                var allowed_custmors = profile.user_metadata.allowed_custmors
                localStorage.setItem('auth0_user_id', profile.user_id)
                localStorage.setItem("allowed_custmors", JSON.stringify(allowed_custmors))
                if (profile.user_id.includes('samlp')) {
                    localStorage.setItem('email_id', profile.email_id)
                    localStorage.setItem('first_name', profile.first_name)
                    localStorage.setItem('last_name', profile.last_name)
                    localStorage.setItem('cust_id', profile.cust_id)
                    router.push('/dashboard')
                } else if (profile.user_id.includes('google')) {
                    localStorage.setItem('email_id', profile.email)
                    localStorage.setItem('first_name', profile.given_name)
                    localStorage.setItem('last_name', profile.family_name)
                    localStorage.setItem('cust_id', profile.user_metadata.cust_id)
                    router.push('/dashboard')
                } else {
                    localStorage.setItem('email_id', profile.email)
                    localStorage.setItem('first_name', profile.user_metadata.first_name)
                    localStorage.setItem('last_name', profile.user_metadata.last_name)
                    localStorage.setItem('cust_id', profile.user_metadata.cust_id)
                    router.push('/dashboard')
                }
            })
        })
            .catch(function (err) {

                console.log(err);
            });
    },
    setSession(authResult) {
        console.log('authResult ------>', authResult)
        let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        )
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('expires_at', expiresAt)
    },
    logout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        this.userProfile = null
        router.replace('/')
    },

    login(context) {
        console.log('login calling')
        localStorage.clear()
        this.auth0.authorize()
    },
    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
        return new Date().getTime() < expiresAt
    }
}
