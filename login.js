// 이름 적고 회원가입 버튼 누르면 로컬스토리지에 이름 저장
// 회원 가입 눌렀을 때 이미 저장돼 있으면 이미 회원이라는 경고창
// 로그인 버튼 눌렀을 때 이미 로컬스토리지에 저장되어있으면 안녕하세요 ...님 출력

const $loginForm = document.querySelector('#login-form');
const $login = document.querySelector('#login');
const $signUp = document.querySelector('#signUp');
const $loginInput = document.querySelector('input');
const $greeting = document.querySelector('h1');

const submitForm = (event) => {
  event.preventDefault(); // 새로고침 방지

  const inputName = $loginInput.value;

  // 로그인 버튼, 회원가입 버튼 구분
  const action = event.submitter.value;

  // 로컬스토리지에서 user 배열 가져오기, 로컬스토리지가 null이면 빈 배열
  let user = JSON.parse(localStorage.getItem('user')) || [];

  if (action === 'signUp') {
    // user안의 각각의 객체에 inputName이 있을 때
    if (user.some((u) => u.username === inputName)) {
      alert('이미 저장된 이름입니다!');
    } else {
      user.push({ username: inputName });
      localStorage.setItem('user', JSON.stringify(user));
      alert('회원가입 되었습니다!');
    }
  } else if (action === 'login') {
    if (!user.some((u) => u.username === inputName)) {
      alert('먼저 회원 가입을 해주세요!');
    } else {
      $loginForm.classList.add('hidden');
      $greeting.classList.remove('hidden');
      $greeting.textContent = `Hello ${inputName}`;
    }
  }
};

$loginForm.addEventListener('submit', submitForm);
