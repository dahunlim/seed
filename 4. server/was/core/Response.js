module.exports = {
    type: {
        FAILED                  : { code: 0, msg: '요청에 실패하였습니다.'},
        SUCCESS                 : { code: 1, msg: ''},
        INVALID_PARAMETER       : { code: 2, msg: '잘못된 파라미터 입니다.'},
        NOT_AUTHENTICATION      : { code: 3, msg: '로그인 후 이용해 주세요.'},
        NOT_GRANTED             : { code: 4, msg: '권한이 없습니다.'},
        DATABASE_ERROR          : { code: 5, msg: '데이터베이스 오류'},
        EXCEED_TRY_COUNT        : { code: 6, msg: '요청한도를 초과하였습니다. 잠시 후 이용해 주세요.'},
        USER_NOT_FOUND          : { code: 7, msg: '사용자를 찾을 수 없습니다.'},
        AVAILABLE               : { code: 8, msg: ''},
        NOT_AVAILABLE           : { code: 9, msg: ''},
        SESSION_EXPIRED         : { code: 10, msg: '세션이 만료되었습니다.'},
        PASSWORD_MISMATCH       : { code: 11, msg: '로그인정보를 확인해 주세요.'},
        PASSWORD_LOST           : { code: 12, msg: '비밀번호를 재설정 해주세요.'},
        TIME_EXCEED             : { code: 13, msg: '허용시간이 초과하였습니다.'},
        FAILED_GET_DB           : { code: 14, msg: '데이터베이스 연결을 가져오지 못했습니다.'},
        NOT_PHONE_AUTHENTICATION: { code: 15, msg: '핸드폰 인증 미인증 상태입니다.' },
        AWS_S3_FAILED           : { code: 16, msg: 'AWS S3 쿼리가 실패하였습니다.'},
        INTERNAL_ERROR          : { code: 99, msg: '서버 오류'},
        NOT_SUPPORT             : { code: 100, mag: '지원하지 않는 프로토콜 입니다.'}
    },
    get: (response, data) => {
        const rs = Object.assign({}, response);
        rs.data = data;
        return rs;
    }
};