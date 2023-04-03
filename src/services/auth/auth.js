export default {
    isAuthenticated() {
      // 인증 여부를 확인하는 예시 코드
      const authInfo = localStorage.getItem('token');
      return !!authInfo;
    },
}