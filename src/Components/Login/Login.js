import React from 'react';
import Form from './Form';
import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      animation: 'onLogin',
    };

    this.inputs = [
      {
        name: 'email',
        type: 'text',
        text: '이메일 주소',
        isCheck: this.isEmail,
        errorMsg: '유효한 이메일 주소를 입력하세요',
      },

      {
        name: 'password',
        type: 'password',
        text: '패스워드',
        isCheck: this.isPassword,
        errorMsg: '패스워드는 5자리부터 10자리 미만입니다.',
      },
    ];

    this.isEmail =
      this.state.email.includes('@') && this.state.email.endsWith('.com');
    this.isPassword =
      this.state.password.length >= 6 && this.state.password.length <= 10; //대문자 , 숫자 적용하기
  }

  handleValue = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: '' });
    }, 600);
  }

  handleBtn = e => {
    e.preventDefault();
    fetch('http://10.58.5.254:8000/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(resData => resData.json())
      .then(jsonData => {
        console.log(jsonData);
        sessionStorage.setItem('accessToken', jsonData.token);
        // this.props.history.push('#');
        if (jsonData.MESSAGE === 'INVALID_EMAIL') {
          alert('이메일을 확인해주세요.');
        }
        if (jsonData.MESSAGE === 'INVALID_PASSWORD') {
          alert('패스워드를 확인해주세요.');
        }
      });
  };

  render() {
    return (
      <div className="bodyBack">
        <div className={'login'}>
          <div className={'modalBody ' + this.state.animation}>
            <button
              className="modalCloseBtn"
              type="button"
              onClick={() => {
                this.setState({
                  animation: 'offLoginPage',
                });
              }}
            >
              <img alt="closeButton_image" src="./images/closeBtn.png" />
            </button>
            <div className="modalHeadingWrap">
              <h1 className="modalTitle">안녕하세요.</h1>
              <p>WeSop에 오신 것을 진심으로 환영합니다.</p>
            </div>

            {this.inputs.map(input => (
              <Form
                name={input.name}
                text={input.text}
                type={input.type}
                errorMsg={input.errorMsg}
                isCheck={input.isCheck}
                handleValue={this.handleValue}
              />
            ))}
            <button
              className="btnLogin"
              onClick={this.handleBtn}
              disabled={this.isCheck ? false : true}
            >
              계속
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
