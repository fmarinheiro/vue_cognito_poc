import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
  } from 'amazon-cognito-identity-js'

const userPool = new CognitoUserPool({
    UserPoolId: process.env.VUE_APP_USER_POOL_ID,
    ClientId: process.env.VUE_APP_CLIENT_ID,
});

async function login(username, password)
{
    const cognitoUser = new CognitoUser({ Username:  username, Pool: userPool });
    const authenticationDetails = new AuthenticationDetails({ Username : username, Password : password });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
               onSuccess: function (result) {resolve(result) },

               onFailure: function(err) { console.log(err); reject(err) }
        })
      })
}

async function logout()
{
    return new Promise((success) => {
        const cognitoUser = getCurrentUser()
        if (cognitoUser !== null) {
          cognitoUser.signOut();
        }

        success();
    });
}

function getCurrentUser()
{
    return userPool.getCurrentUser();
}

export { login, logout, getCurrentUser };