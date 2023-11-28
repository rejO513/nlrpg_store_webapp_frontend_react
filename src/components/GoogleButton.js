import { useGoogleLogin } from "@react-oauth/google";

import { Button } from 'semantic-ui-react'

// ログインボタンの画像
import googleLoginImage from '../assets/images/signinwithgoogle.svg';
import googleSignUpImage from '../assets/images/signupwithgoogle.svg';

// 「Googleでログイン」ボタン
export function LoginWithGoogleButton(props) {

	const googleLogin = useGoogleLogin({
		flow: 'auth-code',
		scope: 'openid',
		onSuccess: async (codeResponse) => { props.handler(codeResponse); },
	});

	return (
		<Button as="div" labelPosition="left" className='image-button' onClick={googleLogin}>
      		<img src={googleLoginImage} alt="Googleでログイン"/>
    	</Button>
	);
}

// 「Googleで登録」ボタン
export function SignUpWithGoogleButton(props) {

	const googleLogin = useGoogleLogin({
		flow: 'auth-code',
		scope: 'openid',
		onSuccess: async (codeResponse) => { props.handler(codeResponse); },
	});

	return (
		<Button as="div" labelPosition="left" className='image-button' onClick={googleLogin}>
      		<img src={googleSignUpImage} alt="Googleで登録" />
    	</Button>
	);
}

