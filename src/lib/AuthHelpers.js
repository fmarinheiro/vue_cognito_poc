import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
  } from 'amazon-cognito-identity-js'

const userPool = new CognitoUserPool({
    UserPoolId: 'eu-west-3_12aTq4hbQ',
    ClientId: '4nakl4ru21m30e26j39as27c6c',
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
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser !== null) {
          cognitoUser.signOut();
        }

        success();
    });
}

export { login, logout };