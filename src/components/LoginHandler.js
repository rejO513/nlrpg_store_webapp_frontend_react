import React from 'react'
import { Header } from 'semantic-ui-react'

import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from "axios";
import * as Error from '../Error.js';
import { LoginWithGoogleButton, SignUpWithGoogleButton } from './GoogleButton.js';

import "./Button.css"

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;
const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

export default function LoginHandler({state, setStateItem}){
	
	// Authorization Code から id_token(JWI), access_token を取得
    const verifyCode = async (code) => {
		return await axios
      		.post(`${baseURL}/verify-code/`,
				{ code: code },
			)
			.then((res) => {
				const tokenInfo = res.data
				return tokenInfo
			})
			.catch((err) => {
				console.log("Error Verify Code", err)
				const error_code = verifyErrorCode();
				return { error_code };
			})
	}

	// id_token(JWI) から Googleアカウント情報を取得
	const verifyToken = async (googleToken) => {
		const token = googleToken
		return await axios
      		.post(`${baseURL}/verify-token/`,
				{ id_token: token },
			)
			.then((res) => {
				const user_google_info = res.data
				return user_google_info
			})
			.catch((err) => {
				console.log("Error Verify Token", err);
				const error_code = verifyErrorCode();
				return { error_code };
			})
	}

	// GoogleのaccessTokenをDRFのaccessToken, refreshTokenに変換
	const convertToken = async (userAccessToken) => {
		const token = userAccessToken
		return await axios
			.post(`${baseURL}/auth/convert-token`, {
				token: token,
				backend: "google-oauth2",
				grant_type: "convert_token",
				client_id: drfClientId,
				client_secret: drfClientSecret,
			})
			.then((res) => {
				const { access_token, refresh_token } = res.data;
				localStorage.setItem("access_token", access_token);
				localStorage.setItem("refresh_token", refresh_token);
				return access_token
			})
			.catch((err) => {
				console.log("Error Google Login", err);
				const error_code = verifyErrorCode();
				return { error_code };
			})
	}

	// ユーザー登録を行う
	const registerUser = async (user_data) => {
		console.log(user_data)
		// 表示名
		const username = user_data['name']
		// メールアドレス
		const email = user_data['email']
		// ユーザーアイコン
		const image_url = user_data['picture']
		console.log(username, email, image_url)
		return await axios
			.post(`${baseURL}/register/`, {
				username: username,
				email: email,
				image_url: image_url
				},
			)
			.then((res) => {
				const { username, email, image_url } = res.data;
				setStateItem('errorMessage', null);
				return { username, email, image_url }
			})
			.catch((err) => {
				console.log("Error Regigster User", err);
				const error_code = verifyErrorCode(err.response.data);
				return { error_code };
			})
	}

	// エラーコードをチェック
	const verifyErrorCode = (errorCode) => {
		if(!errorCode){
			return Error.UNKNOWN;
		}
		if(errorCode.email[0] === 'この email を持った user が既に存在します。'){
			return Error.ALREADY_REGISTERD;
		}
		return Error.UNKNOWN;
	}

	// ユーザー情報を取得
	const getUserDetail = async (accessToken) => {
		const token = accessToken
		return await axios
			.get(`${baseURL}/get-user-detail/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			})
			.then((res) => {
                console.log(res.data);
				// const { username, email, image_url } = res.data;
				return res.data;
			})
			.catch((err) => {
				console.log("Error Get User Detail", err);
				const error_code = verifyErrorCode();
				return { error_code };
			})
	}

	// Googleアカウントを用いて、ログインする
	const handleGoogleLogin = async (codeResponse) => {

			// authorization code
			console.log(codeResponse);

			// id_token(JWI), access_token, refresh_token
			const tokenInfo = await verifyCode(codeResponse.code);
			if(tokenInfo.error_code){
				loginError(tokenInfo.error_code);
				return;
			} 
			console.log(tokenInfo);

			// ユーザー情報の取得
			const user_google_info = await verifyToken(tokenInfo.id_token);
			if(user_google_info.error_code){
				loginError(user_google_info.error_code);
				return;
			}
			console.log(user_google_info);

			// DRFアクセストークンに変換
			const drfAccessToken = await convertToken(tokenInfo.access_token);
			if(drfAccessToken.error_code){
				loginError(drfAccessToken.error_code);
				return;
			}
			console.log(drfAccessToken);
	
			// drfAccessTokenを使ってユーザデータ表示
			const userDetail = await getUserDetail(drfAccessToken);
			if(userDetail.error_code){
				loginError(userDetail.error_code);
				return;
			}
			console.log(userDetail);

			// ステート更新
			setStateItem('userDetail', userDetail);
			setStateItem('errorMessage', null);
			
			// LocalStorageに保存
			localStorage.setItem('userDetail', JSON.stringify(userDetail));
	}

	// ログイン時のエラー
	const loginError = (error_code) => {
		if(error_code === Error.UNKNOWN){
			setStateItem('errorMessage', Error.LOGIN_FAILED);
			return;
		}
		setStateItem('errorMessage', error_code);
	}

	// 登録時のエラー
	const signUpError = (error_code) => {
		if(error_code === Error.UNKNOWN){
			setStateItem('errorMessage', Error.REGISTER_FAILED);
			return;
		}
		setStateItem('errorMessage', error_code);
	}
	
	// Googleアカウントを用いて、ユーザー登録を行う
	const handleGoogleSignUp = async (codeResponse) => {
			
			// authorization code
			console.log(codeResponse);
	
			// id_token(JWI), access_token, refresh_token
			const tokenInfo = await verifyCode(codeResponse.code);
			if(tokenInfo.error_code){
				signUpError(tokenInfo.error_code);
				return;
			}
			console.log(tokenInfo);

			// id_token(JWT)をデコード
			const tokenId = tokenInfo.id_token;
			const userVerifiedData = await verifyToken(tokenId);
			if(userVerifiedData.error_code){
				signUpError(userVerifiedData.error_code);
				return;
			}
			console.log(userVerifiedData);
	
			// デコードされたユーザ情報で新規登録
			const userRegisteredData = await registerUser(userVerifiedData);
			if(userRegisteredData.error_code){
				signUpError(userRegisteredData.error_code);
				return;
			}
			
			// GoogleのaccessTokenをDRFのaccessTokenに変換
			const userAccessToken = tokenInfo.access_token;
			const drfAccessToken = await convertToken(userAccessToken);
			if(drfAccessToken.error_code){
				signUpError(drfAccessToken.error_code);
				return;
			}
			console.log(drfAccessToken);
			
			// drfAccessTokenを使ってユーザデータ表示
			const userDetail = await getUserDetail(drfAccessToken);
			if(userDetail.error_code){
				signUpError(userDetail.error_code);
				return;
			}
			console.log(userDetail);
	
			// ステート更新
			setStateItem('userDetail', userDetail);
			setStateItem('errorMessage', null);

			// LocalStorageに保存
			localStorage.setItem('userDetail', JSON.stringify(userDetail));
		}

    return(
        <GoogleOAuthProvider clientId={googleClientId}>
			  <Header as='h4'>ログイン</Header>
			  {/* 「Googleでログイン」ボタン */}
			  <LoginWithGoogleButton handler={handleGoogleLogin}/>
			  <Header as='h4'>新規登録</Header>
			  {/* 「Googleで登録」ボタン */}
			  <SignUpWithGoogleButton handler={handleGoogleSignUp}/>
		</GoogleOAuthProvider>
    );
}