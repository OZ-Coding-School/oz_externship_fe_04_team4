import type {
  AccountsDetail,
  AccountsList,
  ApplicationsDetail,
  ApplicationsList,
  LectureList,
  LecturesDetail,
  RecruitmentDetail,
  RecruitmentList,
  RecruitmentTags,
  SignupTrends,
  StudyGroupDetail,
  StudyGroupList,
  StudyReviewDetail,
  StudyReviewList,
  WithdrawalReasonsPercentage,
  WithdrawalReasonsStatsMonthly,
  WithdrawalsDetail,
  WithdrawalsList,
  WithdrawalsTrends,
} from '@/mocks/types/accounts'

// api/v1/admin/accounts
// 유저 목록 조회
export const mockAccountsList: AccountsList = {
  count: 4018,
  next: 'http://api.ozcoding.site/api/v1/admin/accounts?page=2&page_size=20',
  previous: null,
  results: [
    {
      id: 1,
      email: 'admin@example.com',
      nickname: 'hong1',
      name: '홍길동',
      birthday: '1995-01-15',
      status: 'active',
      role: 'user',
      withdraw_at: '2025-11-02T09:15:00+09:00',
      created_at: '2025-10-30T10:01:57.505250+09:00',
    },
    {
      id: 2,
      email: 'user2@example.com',
      nickname: 'young2',
      name: '김영희',
      birthday: '1994-03-22',
      status: 'active',
      role: 'user',
      withdraw_at: '2025-11-03T11:30:00+09:00',
      created_at: '2025-10-30T10:05:10.505250+09:00',
    },
    {
      id: 3,
      email: 'user3@example.com',
      nickname: 'chul3',
      name: '이철수',
      birthday: '1992-07-09',
      status: 'active',
      role: 'staff',
      withdraw_at: '2025-11-04T14:05:20+09:00',
      created_at: '2025-10-30T10:10:20.505250+09:00',
    },
    {
      id: 4,
      email: 'user4@example.com',
      nickname: 'min4',
      name: '박민수',
      birthday: '1990-11-30',
      status: 'active',
      role: 'user',
      withdraw_at: '2025-11-05T16:42:10+09:00',
      created_at: '2025-10-30T10:15:30.505250+09:00',
    },
    {
      id: 5,
      email: 'user5@example.com',
      nickname: 'suji5',
      name: '최수지',
      birthday: '1996-05-02',
      status: 'active',
      role: 'user',
      withdraw_at: '2025-11-06T10:20:00+09:00',
      created_at: '2025-10-30T10:20:40.505250+09:00',
    },
    {
      id: 6,
      email: 'user6@example.com',
      nickname: 'woo6',
      name: '장우진',
      birthday: '1993-08-18',
      status: 'inactive',
      role: 'staff',
      withdraw_at: '2025-11-07T13:10:45+09:00',
      created_at: '2025-10-30T10:25:00.505250+09:00',
    },
    {
      id: 7,
      email: 'user7@example.com',
      nickname: 'jimin7',
      name: '한지민',
      birthday: '1997-09-12',
      status: 'inactive',
      role: 'user',
      withdraw_at: '2025-11-08T18:25:30+09:00',
      created_at: '2025-10-30T10:30:10.505250+09:00',
    },
    {
      id: 8,
      email: 'user8@example.com',
      nickname: 'sehun8',
      name: '오세훈',
      birthday: '1989-12-25',
      status: 'active',
      role: 'admin',
      withdraw_at: '2025-11-09T08:05:10+09:00',
      created_at: '2025-10-30T10:35:20.505250+09:00',
    },
    {
      id: 9,
      email: 'user9@example.com',
      nickname: 'nari9',
      name: '유나리',
      birthday: '1998-02-11',
      status: 'withdrew',
      role: 'user',
      withdraw_at: '2025-11-10T12:40:00+09:00',
      created_at: '2025-10-30T10:40:30.505250+09:00',
    },
    {
      id: 10,
      email: 'user10@example.com',
      nickname: 'doyun10',
      name: '정도윤',
      birthday: '1991-06-07',
      status: 'active',
      role: 'staff',
      withdraw_at: '2025-11-11T15:55:20+09:00',
      created_at: '2025-10-30T10:45:40.505250+09:00',
    },
    {
      id: 11,
      email: 'user11@example.com',
      nickname: 'jiho11',
      name: '서지호',
      birthday: '1999-03-19',
      status: 'withdrew',
      role: 'user',
      withdraw_at: '2025-11-12T09:10:30+09:00',
      created_at: '2025-10-30T10:50:50.505250+09:00',
    },
    {
      id: 12,
      email: 'user12@example.com',
      nickname: 'daeun12',
      name: '문다은',
      birthday: '1993-04-28',
      status: 'withdrew',
      role: 'user',
      withdraw_at: '2025-11-13T11:25:45+09:00',
      created_at: '2025-10-30T10:55:00.505250+09:00',
    },
    {
      id: 13,
      email: 'user13@example.com',
      nickname: 'hae13',
      name: '신해준',
      birthday: '1990-09-01',
      status: 'withdrew',
      role: 'staff',
      withdraw_at: '2025-11-14T17:35:00+09:00',
      created_at: '2025-10-30T11:00:10.505250+09:00',
    },
    {
      id: 14,
      email: 'user14@example.com',
      nickname: 'bora14',
      name: '강보라',
      birthday: '1997-01-09',
      status: 'withdrew',
      role: 'user',
      withdraw_at: '2025-11-15T20:15:10+09:00',
      created_at: '2025-10-30T11:05:20.505250+09:00',
    },
    {
      id: 15,
      email: 'user15@example.com',
      nickname: 'tae15',
      name: '노태현',
      birthday: '1992-02-02',
      status: 'withdrew',
      role: 'user',
      withdraw_at: '2025-11-16T07:50:30+09:00',
      created_at: '2025-10-30T11:10:30.505250+09:00',
    },
    {
      id: 16,
      email: 'user16@example.com',
      nickname: 'dasol16',
      name: '임다솔',
      birthday: '1996-06-18',
      status: 'withdrew',
      role: 'admin',
      withdraw_at: '2025-11-17T13:05:55+09:00',
      created_at: '2025-10-30T11:15:40.505250+09:00',
    },
    {
      id: 17,
      email: 'user17@example.com',
      nickname: 'jihoon17',
      name: '배지훈',
      birthday: '1994-10-21',
      status: 'withdrew',
      role: 'staff',
      withdraw_at: '2025-11-18T10:40:00+09:00',
      created_at: '2025-10-30T11:20:50.505250+09:00',
    },
    {
      id: 18,
      email: 'user18@example.com',
      nickname: 'soyeon18',
      name: '권소연',
      birthday: '1995-12-03',
      status: 'withdrew',
      role: 'user',
      withdraw_at: '2025-11-19T16:00:15+09:00',
      created_at: '2025-10-30T11:25:00.505250+09:00',
    },
    {
      id: 19,
      email: 'user19@example.com',
      nickname: 'gaeun19',
      name: '윤가은',
      birthday: '1998-11-17',
      status: 'withdrew',
      role: 'user',
      withdraw_at: '2025-11-20T19:20:40+09:00',
      created_at: '2025-10-30T11:30:10.505250+09:00',
    },
    {
      id: 20,
      email: 'user20@example.com',
      nickname: 'haneul20',
      name: '조하늘',
      birthday: '1991-04-05',
      status: 'active',
      role: 'admin',
      withdraw_at: null,
      created_at: '2025-10-30T11:35:20.505250+09:00',
    },
  ],
}

// api/v1/admin/accounts/{account_id}
// 유저 정보 상세 조회
export const mockAccountDetail: AccountsDetail = {
  // mockAccountsList의 첫 번째 유저(id: 1)와 연결
  id: 1,
  email: 'admin@example.com',
  nickname: 'hong1',
  name: '홍길동',
  gender: 'M',
  phone_number: '01000000001',
  birthday: '1995-01-15',
  status: 'withdrew',
  role: 'user',
  profile_img_url: 'https://example.com/images/profiles/user1.png',
  created_at: '2025-10-30T10:01:57.505250+09:00',
}

export const mockAccountDetailMap: Record<number, AccountsDetail> = {
  1: {
    id: 1,
    email: 'admin@example.com',
    nickname: 'hong1',
    name: '홍길동',
    gender: 'M',
    phone_number: '01000000001',
    birthday: '1995-01-15',
    status: 'active',
    role: 'admin',
    profile_img_url: 'https://example.com/images/profiles/user1.png',
    created_at: '2025-10-30T10:01:57.505250+09:00',
  },
  2: {
    id: 2,
    email: 'user2@example.com',
    nickname: 'young2',
    name: '김영희',
    gender: 'F',
    phone_number: '01000000002',
    birthday: '1994-03-22',
    status: 'active',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user2.png',
    created_at: '2025-10-30T10:05:10.505250+09:00',
  },
  3: {
    id: 3,
    email: 'user3@example.com',
    nickname: 'chul3',
    name: '이철수',
    gender: 'M',
    phone_number: '01000000003',
    birthday: '1992-07-09',
    status: 'inactive',
    role: 'staff',
    profile_img_url: 'https://example.com/images/profiles/user3.png',
    created_at: '2025-10-30T10:10:20.505250+09:00',
  },
  4: {
    id: 4,
    email: 'user4@example.com',
    nickname: 'min4',
    name: '박민수',
    gender: 'M',
    phone_number: '01000000004',
    birthday: '1990-11-30',
    status: 'active',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user4.png',
    created_at: '2025-10-30T10:15:30.505250+09:00',
  },
  5: {
    id: 5,
    email: 'user5@example.com',
    nickname: 'suji5',
    name: '최수지',
    gender: 'F',
    phone_number: '01000000005',
    birthday: '1996-05-02',
    status: 'active',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user5.png',
    created_at: '2025-10-30T10:20:40.505250+09:00',
  },
  6: {
    id: 6,
    email: 'user6@example.com',
    nickname: 'woo6',
    name: '장우진',
    gender: 'M',
    phone_number: '01000000006',
    birthday: '1993-08-18',
    status: 'inactive',
    role: 'staff',
    profile_img_url: 'https://example.com/images/profiles/user6.png',
    created_at: '2025-10-30T10:25:00.505250+09:00',
  },
  7: {
    id: 7,
    email: 'user7@example.com',
    nickname: 'jimin7',
    name: '한지민',
    gender: 'F',
    phone_number: '01000000007',
    birthday: '1997-09-12',
    status: 'inactive',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user7.png',
    created_at: '2025-10-30T10:30:10.505250+09:00',
  },
  8: {
    id: 8,
    email: 'user8@example.com',
    nickname: 'sehun8',
    name: '오세훈',
    gender: 'M',
    phone_number: '01000000008',
    birthday: '1989-12-25',
    status: 'active',
    role: 'admin',
    profile_img_url: 'https://example.com/images/profiles/user8.png',
    created_at: '2025-10-30T10:35:20.505250+09:00',
  },
  9: {
    id: 9,
    email: 'user9@example.com',
    nickname: 'nari9',
    name: '유나리',
    gender: 'F',
    phone_number: '01000000009',
    birthday: '1998-02-11',
    status: 'withdrew',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user9.png',
    created_at: '2025-10-30T10:40:30.505250+09:00',
  },
  10: {
    id: 10,
    email: 'user10@example.com',
    nickname: 'doyun10',
    name: '정도윤',
    gender: 'M',
    phone_number: '01000000010',
    birthday: '1991-06-07',
    status: 'active',
    role: 'staff',
    profile_img_url: 'https://example.com/images/profiles/user10.png',
    created_at: '2025-10-30T10:45:40.505250+09:00',
  },
  11: {
    id: 11,
    email: 'user11@example.com',
    nickname: 'jiho11',
    name: '서지호',
    gender: 'M',
    phone_number: '01000000011',
    birthday: '1999-03-19',
    status: 'withdrew',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user11.png',
    created_at: '2025-10-30T10:50:50.505250+09:00',
  },
  12: {
    id: 12,
    email: 'user12@example.com',
    nickname: 'daeun12',
    name: '문다은',
    gender: 'F',
    phone_number: '01000000012',
    birthday: '1993-04-28',
    status: 'withdrew',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user12.png',
    created_at: '2025-10-30T10:55:00.505250+09:00',
  },
  13: {
    id: 13,
    email: 'user13@example.com',
    nickname: 'hae13',
    name: '신해준',
    gender: 'M',
    phone_number: '01000000013',
    birthday: '1990-09-01',
    status: 'withdrew',
    role: 'staff',
    profile_img_url: 'https://example.com/images/profiles/user13.png',
    created_at: '2025-10-30T11:00:10.505250+09:00',
  },
  14: {
    id: 14,
    email: 'user14@example.com',
    nickname: 'bora14',
    name: '강보라',
    gender: 'F',
    phone_number: '01000000014',
    birthday: '1997-01-09',
    status: 'withdrew',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user14.png',
    created_at: '2025-10-30T11:05:20.505250+09:00',
  },
  15: {
    id: 15,
    email: 'user15@example.com',
    nickname: 'tae15',
    name: '노태현',
    gender: 'M',
    phone_number: '01000000015',
    birthday: '1992-02-02',
    status: 'withdrew',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user15.png',
    created_at: '2025-10-30T11:10:30.505250+09:00',
  },
  16: {
    id: 16,
    email: 'user16@example.com',
    nickname: 'dasol16',
    name: '임다솔',
    gender: 'F',
    phone_number: '01000000016',
    birthday: '1996-06-18',
    status: 'withdrew',
    role: 'admin',
    profile_img_url: 'https://example.com/images/profiles/user16.png',
    created_at: '2025-10-30T11:15:40.505250+09:00',
  },
  17: {
    id: 17,
    email: 'user17@example.com',
    nickname: 'jihoon17',
    name: '배지훈',
    gender: 'M',
    phone_number: '01000000017',
    birthday: '1994-10-21',
    status: 'withdrew',
    role: 'staff',
    profile_img_url: 'https://example.com/images/profiles/user17.png',
    created_at: '2025-10-30T11:20:50.505250+09:00',
  },
  18: {
    id: 18,
    email: 'user18@example.com',
    nickname: 'soyeon18',
    name: '권소연',
    gender: 'F',
    phone_number: '01000000018',
    birthday: '1995-12-03',
    status: 'withdrew',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user18.png',
    created_at: '2025-10-30T11:25:00.505250+09:00',
  },
  19: {
    id: 19,
    email: 'user19@example.com',
    nickname: 'gaeun19',
    name: '윤가은',
    gender: 'F',
    phone_number: '01000000019',
    birthday: '1998-11-17',
    status: 'withdrew',
    role: 'user',
    profile_img_url: 'https://example.com/images/profiles/user19.png',
    created_at: '2025-10-30T11:30:10.505250+09:00',
  },
  20: {
    id: 20,
    email: 'user20@example.com',
    nickname: 'haneul20',
    name: '조하늘',
    gender: 'F',
    phone_number: '01000000020',
    birthday: '1991-04-05',
    status: 'active',
    role: 'admin',
    profile_img_url: 'https://example.com/images/profiles/user20.png',
    created_at: '2025-10-30T11:35:20.505250+09:00',
  },
}
// api/v1/admin/withdrawals
// 회원 탈퇴 내역 목록 조회
export const mockWithdrawalsList: WithdrawalsList = {
  count: 1973,
  next: 'http://api.ozcoding.site/api/v1/admin/withdrawals?page=2&page_size=20',
  previous: null,
  results: [
    {
      id: 3985,
      email: 'user58202506@test.com',
      name: '테스트58202506',
      role: 'user',
      birthday: '2000-01-01',
      reason: 'NO_LONGER_NEEDED',
      withdrawn_at: '2025-11-01T01:01:30+09:00',
    },
    {
      id: 3986,
      email: 'user1@example.com',
      name: '홍길동',
      role: 'user',
      birthday: '1995-01-15',
      reason: 'LACK_OF_INTEREST',
      withdrawn_at: '2025-11-02T09:15:00+09:00',
    },
    {
      id: 3987,
      email: 'user2@example.com',
      name: '김영희',
      role: 'user',
      birthday: '1994-03-22',
      reason: 'TOO_DIFFICULT',
      withdrawn_at: '2025-11-03T11:30:00+09:00',
    },
    {
      id: 3988,
      email: 'user3@example.com',
      name: '이철수',
      role: 'staff',
      birthday: '1992-07-09',
      reason: 'FOUND_BETTER_SERVICE',
      withdrawn_at: '2025-11-04T14:05:20+09:00',
    },
    {
      id: 3989,
      email: 'user4@example.com',
      name: '박민수',
      role: 'user',
      birthday: '1990-11-30',
      reason: 'PRIVACY_CONCERNS',
      withdrawn_at: '2025-11-05T16:42:10+09:00',
    },
    {
      id: 3990,
      email: 'user5@example.com',
      name: '최수지',
      role: 'user',
      birthday: '1996-05-02',
      reason: 'POOR_SERVICE_QUALITY',
      withdrawn_at: '2025-11-06T10:20:00+09:00',
    },
    {
      id: 3991,
      email: 'user6@example.com',
      name: '장우진',
      role: 'staff',
      birthday: '1993-08-18',
      reason: 'TECHNICAL_ISSUES',
      withdrawn_at: '2025-11-07T13:10:45+09:00',
    },
    {
      id: 3992,
      email: 'user7@example.com',
      name: '한지민',
      role: 'user',
      birthday: '1997-09-12',
      reason: 'LACK_OF_CONTENT',
      withdrawn_at: '2025-11-08T18:25:30+09:00',
    },
    {
      id: 3993,
      email: 'user8@example.com',
      name: '오세훈',
      role: 'admin',
      birthday: '1989-12-25',
      reason: 'OTHER',
      withdrawn_at: '2025-11-09T08:05:10+09:00',
    },
    {
      id: 3994,
      email: 'user9@example.com',
      name: '유나리',
      role: 'user',
      birthday: '1998-02-11',
      reason: 'NO_LONGER_NEEDED',
      withdrawn_at: '2025-11-10T12:40:00+09:00',
    },
    {
      id: 3995,
      email: 'user10@example.com',
      name: '정도윤',
      role: 'staff',
      birthday: '1991-06-07',
      reason: 'LACK_OF_INTEREST',
      withdrawn_at: '2025-11-11T15:55:20+09:00',
    },
    {
      id: 3996,
      email: 'user11@example.com',
      name: '서지호',
      role: 'user',
      birthday: '1999-03-19',
      reason: 'TOO_DIFFICULT',
      withdrawn_at: '2025-11-12T09:10:30+09:00',
    },
    {
      id: 3997,
      email: 'user12@example.com',
      name: '문다은',
      role: 'user',
      birthday: '1993-04-28',
      reason: 'FOUND_BETTER_SERVICE',
      withdrawn_at: '2025-11-13T11:25:45+09:00',
    },
    {
      id: 3998,
      email: 'user13@example.com',
      name: '신해준',
      role: 'staff',
      birthday: '1990-09-01',
      reason: 'PRIVACY_CONCERNS',
      withdrawn_at: '2025-11-14T17:35:00+09:00',
    },
    {
      id: 3999,
      email: 'user14@example.com',
      name: '강보라',
      role: 'user',
      birthday: '1997-01-09',
      reason: 'POOR_SERVICE_QUALITY',
      withdrawn_at: '2025-11-15T20:15:10+09:00',
    },
    {
      id: 4000,
      email: 'user15@example.com',
      name: '노태현',
      role: 'user',
      birthday: '1992-02-02',
      reason: 'TECHNICAL_ISSUES',
      withdrawn_at: '2025-11-16T07:50:30+09:00',
    },
    {
      id: 4001,
      email: 'user16@example.com',
      name: '임다솔',
      role: 'admin',
      birthday: '1996-06-18',
      reason: 'LACK_OF_CONTENT',
      withdrawn_at: '2025-11-17T13:05:55+09:00',
    },
    {
      id: 4002,
      email: 'user17@example.com',
      name: '배지훈',
      role: 'staff',
      birthday: '1994-10-21',
      reason: 'OTHER',
      withdrawn_at: '2025-11-18T10:40:00+09:00',
    },
    {
      id: 4003,
      email: 'user18@example.com',
      name: '권소연',
      role: 'user',
      birthday: '1995-12-03',
      reason: 'NO_LONGER_NEEDED',
      withdrawn_at: '2025-11-19T16:00:15+09:00',
    },
    {
      id: 4004,
      email: 'user19@example.com',
      name: '윤가은',
      role: 'user',
      birthday: '1998-11-17',
      reason: 'LACK_OF_CONTENT',
      withdrawn_at: '2025-11-20T19:20:40+09:00',
    },
  ],
}

// api/v1/admin/withdrawals/{withdrawal_id}
// 회원 탈퇴 내역 상세 조회
export const mockWithdrawalsDetail: WithdrawalsDetail = {
  // mockWithdrawalsList의 id 3986(홍길동 탈퇴 이력)과 연결
  id: 3986,
  user: {
    // mockAccountsList / mockAccountDetail의 1번 유저 정보와 연결
    id: 1,
    email: 'user1@example.com',
    nickname: 'hong1',
    name: '홍길동',
    gender: 'M',
    role: 'user',
    status: 'withdrew',
    profile_img_url: 'https://example.com/images/profiles/user1.png',
    created_at: '2025-10-30T10:01:57.505250+09:00',
  },
  // mockWithdrawalsList의 reason과 동일하게 맞춤
  reason: 'LACK_OF_INTEREST',
  // 상세 화면에서만 볼 수 있는 자유 입력 사유
  reason_detail:
    '최근에는 학습 시간이 부족해 서비스 이용 빈도가 줄어 탈퇴를 신청했습니다.',
  // 서비스 정책상 탈퇴 처리 예정일(예: 신청일 기준 30일 후)
  due_date: '2025-12-02',
  // mockWithdrawalsList의 withdrawn_at과 동일하게 맞춤
  withdrawn_at: '2025-11-02T09:15:00+09:00',
}

export const mockWithdrawalsDetailMap: Record<number, WithdrawalsDetail> = {
  3985: {
    // mockWithdrawalsList의 id 3985(테스트58202506 탈퇴 이력)과 연결
    id: 3985,
    user: {
      // 실제 계정 목록에는 없지만 과거에 존재했던 계정이라는 설정
      id: 9999,
      email: 'user58202506@test.com',
      nickname: 'test58202506',
      name: '테스트58202506',
      gender: 'M',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/test58202506.png',
      created_at: '2025-10-01T00:00:00+09:00',
    },
    reason: 'NO_LONGER_NEEDED',
    reason_detail: '서비스를 더 이상 사용하지 않아 탈퇴를 신청했습니다.',
    due_date: '2025-12-01',
    withdrawn_at: '2025-11-01T01:01:30+09:00',
  },
  3986: {
    // mockWithdrawalsList의 id 3986(홍길동 탈퇴 이력)과 연결
    id: 3986,
    user: {
      // mockAccountsList / mockAccountDetail의 1번 유저 정보와 연결
      id: 1,
      email: 'user1@example.com',
      nickname: 'hong1',
      name: '홍길동',
      gender: 'M',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user1.png',
      created_at: '2025-10-30T10:01:57.505250+09:00',
    },
    reason: 'LACK_OF_INTEREST',
    reason_detail:
      '최근에는 학습 시간이 부족해 서비스 이용 빈도가 줄어 탈퇴를 신청했습니다.',
    due_date: '2025-12-02',
    withdrawn_at: '2025-11-02T09:15:00+09:00',
  },
  3987: {
    id: 3987,
    user: {
      id: 2,
      email: 'user2@example.com',
      nickname: 'young2',
      name: '김영희',
      gender: 'F',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user2.png',
      created_at: '2025-10-30T10:05:10.505250+09:00',
    },
    reason: 'TOO_DIFFICULT',
    reason_detail: '강의 난이도가 생각보다 높아 따라가기 어려워 탈퇴했습니다.',
    due_date: '2025-12-03',
    withdrawn_at: '2025-11-03T11:30:00+09:00',
  },
  3988: {
    id: 3988,
    user: {
      id: 3,
      email: 'user3@example.com',
      nickname: 'chul3',
      name: '이철수',
      gender: 'M',
      role: 'staff',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user3.png',
      created_at: '2025-10-30T10:10:20.505250+09:00',
    },
    reason: 'FOUND_BETTER_SERVICE',
    reason_detail:
      '비슷한 기능을 제공하지만 더 적합한 다른 서비스를 이용하게 되어 탈퇴했습니다.',
    due_date: '2025-12-04',
    withdrawn_at: '2025-11-04T14:05:20+09:00',
  },
  3989: {
    id: 3989,
    user: {
      id: 4,
      email: 'user4@example.com',
      nickname: 'min4',
      name: '박민수',
      gender: 'M',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user4.png',
      created_at: '2025-10-30T10:15:30.505250+09:00',
    },
    reason: 'PRIVACY_CONCERNS',
    reason_detail:
      '개인정보 수집 및 보관 정책이 부담스러워 서비스를 더 사용하지 않기로 했습니다.',
    due_date: '2025-12-05',
    withdrawn_at: '2025-11-05T16:42:10+09:00',
  },
  3990: {
    id: 3990,
    user: {
      id: 5,
      email: 'user5@example.com',
      nickname: 'suji5',
      name: '최수지',
      gender: 'F',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user5.png',
      created_at: '2025-10-30T10:20:40.505250+09:00',
    },
    reason: 'POOR_SERVICE_QUALITY',
    reason_detail:
      '서비스 품질이 기대에 미치지 못해 더 이상 사용하지 않기로 결정했습니다.',
    due_date: '2025-12-06',
    withdrawn_at: '2025-11-06T10:20:00+09:00',
  },
  3991: {
    id: 3991,
    user: {
      id: 6,
      email: 'user6@example.com',
      nickname: 'woo6',
      name: '장우진',
      gender: 'M',
      role: 'staff',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user6.png',
      created_at: '2025-10-30T10:25:00.505250+09:00',
    },
    reason: 'TECHNICAL_ISSUES',
    reason_detail:
      '자주 발생하는 오류와 기술적인 문제로 인해 서비스 이용이 어려워 탈퇴했습니다.',
    due_date: '2025-12-07',
    withdrawn_at: '2025-11-07T13:10:45+09:00',
  },
  3992: {
    id: 3992,
    user: {
      id: 7,
      email: 'user7@example.com',
      nickname: 'jimin7',
      name: '한지민',
      gender: 'F',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user7.png',
      created_at: '2025-10-30T10:30:10.505250+09:00',
    },
    reason: 'LACK_OF_CONTENT',
    reason_detail:
      '원하는 강의와 콘텐츠가 부족해 더 이상 사용할 이유가 없다고 판단했습니다.',
    due_date: '2025-12-08',
    withdrawn_at: '2025-11-08T18:25:30+09:00',
  },
  3993: {
    id: 3993,
    user: {
      id: 8,
      email: 'user8@example.com',
      nickname: 'sehun8',
      name: '오세훈',
      gender: 'M',
      role: 'admin',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user8.png',
      created_at: '2025-10-30T10:35:20.505250+09:00',
    },
    reason: 'OTHER',
    reason_detail: '개인 사정으로 인해 학습 활동을 중단하게 되어 탈퇴했습니다.',
    due_date: '2025-12-09',
    withdrawn_at: '2025-11-09T08:05:10+09:00',
  },
  3994: {
    id: 3994,
    user: {
      id: 9,
      email: 'user9@example.com',
      nickname: 'nari9',
      name: '유나리',
      gender: 'F',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user9.png',
      created_at: '2025-10-30T10:40:30.505250+09:00',
    },
    reason: 'NO_LONGER_NEEDED',
    reason_detail:
      '학습 목표를 달성해 더 이상 서비스가 필요하지 않다고 판단했습니다.',
    due_date: '2025-12-10',
    withdrawn_at: '2025-11-10T12:40:00+09:00',
  },
  3995: {
    id: 3995,
    user: {
      id: 10,
      email: 'user10@example.com',
      nickname: 'doyun10',
      name: '정도윤',
      gender: 'M',
      role: 'staff',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user10.png',
      created_at: '2025-10-30T10:45:40.505250+09:00',
    },
    reason: 'LACK_OF_INTEREST',
    reason_detail:
      '최근에는 다른 일에 집중하게 되면서 서비스에 대한 관심이 줄어들었습니다.',
    due_date: '2025-12-11',
    withdrawn_at: '2025-11-11T15:55:20+09:00',
  },
  3996: {
    id: 3996,
    user: {
      id: 11,
      email: 'user11@example.com',
      nickname: 'jiho11',
      name: '서지호',
      gender: 'M',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user11.png',
      created_at: '2025-10-30T10:50:50.505250+09:00',
    },
    reason: 'TOO_DIFFICULT',
    reason_detail: '난이도가 어려워 학습을 지속하기 부담스러워 탈퇴했습니다.',
    due_date: '2025-12-12',
    withdrawn_at: '2025-11-12T09:10:30+09:00',
  },
  3997: {
    id: 3997,
    user: {
      id: 12,
      email: 'user12@example.com',
      nickname: 'daeun12',
      name: '문다은',
      gender: 'F',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user12.png',
      created_at: '2025-10-30T10:55:00.505250+09:00',
    },
    reason: 'FOUND_BETTER_SERVICE',
    reason_detail:
      '비슷한 서비스를 제공하는 다른 플랫폼을 주 사용처로 결정해 탈퇴했습니다.',
    due_date: '2025-12-13',
    withdrawn_at: '2025-11-13T11:25:45+09:00',
  },
  3998: {
    id: 3998,
    user: {
      id: 13,
      email: 'user13@example.com',
      nickname: 'hae13',
      name: '신해준',
      gender: 'M',
      role: 'staff',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user13.png',
      created_at: '2025-10-30T11:00:10.505250+09:00',
    },
    reason: 'PRIVACY_CONCERNS',
    reason_detail:
      '개인정보 활용 범위가 부담스러워 더 이상 서비스를 사용하지 않기로 했습니다.',
    due_date: '2025-12-14',
    withdrawn_at: '2025-11-14T17:35:00+09:00',
  },
  3999: {
    id: 3999,
    user: {
      id: 14,
      email: 'user14@example.com',
      nickname: 'bora14',
      name: '강보라',
      gender: 'F',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user14.png',
      created_at: '2025-10-30T11:05:20.505250+09:00',
    },
    reason: 'POOR_SERVICE_QUALITY',
    reason_detail:
      '강의 구성이나 서비스 응답 속도 등 전반적인 품질이 만족스럽지 않았습니다.',
    due_date: '2025-12-15',
    withdrawn_at: '2025-11-15T20:15:10+09:00',
  },
  4000: {
    id: 4000,
    user: {
      id: 15,
      email: 'user15@example.com',
      nickname: 'tae15',
      name: '노태현',
      gender: 'M',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user15.png',
      created_at: '2025-10-30T11:10:30.505250+09:00',
    },
    reason: 'TECHNICAL_ISSUES',
    reason_detail:
      '로그인 오류 및 재생 문제 등 기술적인 이슈가 잦아 탈퇴를 결정했습니다.',
    due_date: '2025-12-16',
    withdrawn_at: '2025-11-16T07:50:30+09:00',
  },
  4001: {
    id: 4001,
    user: {
      id: 16,
      email: 'user16@example.com',
      nickname: 'dasol16',
      name: '임다솔',
      gender: 'F',
      role: 'admin',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user16.png',
      created_at: '2025-10-30T11:15:40.505250+09:00',
    },
    reason: 'LACK_OF_CONTENT',
    reason_detail:
      '필요로 하는 고급 과정이나 특화된 콘텐츠가 부족해 다른 서비스를 찾게 되었습니다.',
    due_date: '2025-12-17',
    withdrawn_at: '2025-11-17T13:05:55+09:00',
  },
  4002: {
    id: 4002,
    user: {
      id: 17,
      email: 'user17@example.com',
      nickname: 'jihoon17',
      name: '배지훈',
      gender: 'M',
      role: 'staff',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user17.png',
      created_at: '2025-10-30T11:20:50.505250+09:00',
    },
    reason: 'OTHER',
    reason_detail: '개인 일정 변화로 장기간 학습이 어려워 탈퇴를 신청했습니다.',
    due_date: '2025-12-18',
    withdrawn_at: '2025-11-18T10:40:00+09:00',
  },
  4003: {
    id: 4003,
    user: {
      id: 18,
      email: 'user18@example.com',
      nickname: 'soyeon18',
      name: '권소연',
      gender: 'F',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user18.png',
      created_at: '2025-10-30T11:25:00.505250+09:00',
    },
    reason: 'NO_LONGER_NEEDED',
    reason_detail:
      '다른 학습 경로를 찾게 되어 이 서비스는 더 이상 사용하지 않기로 했습니다.',
    due_date: '2025-12-19',
    withdrawn_at: '2025-11-19T16:00:15+09:00',
  },
  4004: {
    id: 4004,
    user: {
      id: 19,
      email: 'user19@example.com',
      nickname: 'gaeun19',
      name: '윤가은',
      gender: 'F',
      role: 'user',
      status: 'withdrew',
      profile_img_url: 'https://example.com/images/profiles/user19.png',
      created_at: '2025-10-30T11:30:10.505250+09:00',
    },
    reason: 'LACK_OF_CONTENT',
    reason_detail:
      '관심 있는 분야의 심화 콘텐츠가 부족해 다른 플랫폼을 이용하기로 했습니다.',
    due_date: '2025-12-20',
    withdrawn_at: '2025-11-20T19:20:40+09:00',
  },
}

// api/v1/admin/analytics/signup/trends
// 회원가입 추세 분석
export const mockSignupTrendsMonthly: SignupTrends = {
  interval: 'monthly',
  from_date: '2024-12-01',
  to_date: '2025-11-30',
  total: 1395,
  items: [
    { period: '2024-12', count: 80 },
    { period: '2025-01', count: 90 },
    { period: '2025-02', count: 95 },
    { period: '2025-03', count: 100 },
    { period: '2025-04', count: 110 },
    { period: '2025-05', count: 105 },
    { period: '2025-06', count: 115 },
    { period: '2025-07', count: 120 },
    { period: '2025-08', count: 130 },
    { period: '2025-09', count: 140 },
    { period: '2025-10', count: 150 },
    { period: '2025-11', count: 160 },
  ],
}

export const mockSignupTrendsYearly: SignupTrends = {
  interval: 'yearly',
  from_date: '2024-12-01',
  to_date: '2025-11-30',
  total: 1135,
  items: [
    { period: '2024-12', count: 60 },
    { period: '2025-01', count: 30 },
    { period: '2025-02', count: 105 },
    { period: '2025-03', count: 100 },
    { period: '2025-04', count: 110 },
    { period: '2025-05', count: 80 },
    { period: '2025-06', count: 115 },
    { period: '2025-07', count: 120 },
    { period: '2025-08', count: 130 },
    { period: '2025-09', count: 140 },
    { period: '2025-10', count: 120 },
    { period: '2025-11', count: 160 },
  ],
}

// api/v1/admin/analytics/withdrawals/trends
// 회원 탈퇴 추세 분석
export const mockWithdrawalsTrendsMonthly: WithdrawalsTrends = {
  interval: 'monthly',
  from_date: '2024-12-01',
  to_date: '2025-11-30',
  total: 1105,
  items: [
    { period: '2024-12', count: 60 },
    { period: '2025-01', count: 70 },
    { period: '2025-02', count: 75 },
    { period: '2025-03', count: 80 },
    { period: '2025-04', count: 85 },
    { period: '2025-05', count: 90 },
    { period: '2025-06', count: 95 },
    { period: '2025-07', count: 100 },
    { period: '2025-08', count: 105 },
    { period: '2025-09', count: 110 },
    { period: '2025-10', count: 115 },
    { period: '2025-11', count: 120 },
  ],
}
export const mockWithdrawalsTrendsYearly: WithdrawalsTrends = {
  interval: 'yearly',
  from_date: '2024-12-01',
  to_date: '2025-11-30',
  total: 1105,
  items: [
    { period: '2024-12', count: 100 },
    { period: '2025-01', count: 80 },
    { period: '2025-02', count: 100 },
    { period: '2025-03', count: 78 },
    { period: '2025-04', count: 85 },
    { period: '2025-05', count: 90 },
    { period: '2025-06', count: 95 },
    { period: '2025-07', count: 100 },
    { period: '2025-08', count: 105 },
    { period: '2025-09', count: 110 },
    { period: '2025-10', count: 115 },
    { period: '2025-11', count: 120 },
  ],
}

// api/v1/admin/analytics/withdrawal-reasons/percentage
// 전체 기간 회원 탈퇴 사유 분석
export const mockWithdrawalReasonsPercentage: WithdrawalReasonsPercentage = {
  from_date: '2021-01-01',
  to_date: '2025-11-30',
  total: 5000,
  items: [
    {
      reason: 'NO_LONGER_NEEDED',
      reason_label: '더 이상 필요하지 않음',
      count: 900,
      percentage: 18,
    },
    {
      reason: 'LACK_OF_INTEREST',
      reason_label: '관심 감소/흥미 저하',
      count: 850,
      percentage: 17,
    },
    {
      reason: 'TOO_DIFFICULT',
      reason_label: '난이도가 너무 높음',
      count: 700,
      percentage: 14,
    },
    {
      reason: 'FOUND_BETTER_SERVICE',
      reason_label: '더 나은/맞는 다른 서비스 이용',
      count: 650,
      percentage: 13,
    },
    {
      reason: 'PRIVACY_CONCERNS',
      reason_label: '개인정보/보안 관련 우려',
      count: 550,
      percentage: 11,
    },
    {
      reason: 'POOR_SERVICE_QUALITY',
      reason_label: '서비스 품질 불만족',
      count: 500,
      percentage: 10,
    },
    {
      reason: 'TECHNICAL_ISSUES',
      reason_label: '오류·버그 등 기술적 문제',
      count: 400,
      percentage: 8,
    },
    {
      reason: 'LACK_OF_CONTENT',
      reason_label: '원하는 콘텐츠/기능 부족',
      count: 300,
      percentage: 6,
    },
    {
      reason: 'OTHER',
      reason_label: '기타',
      count: 150,
      percentage: 3,
    },
  ],
}

// api/v1/admin/analytics/withdrawal-reasons/stats/monthly
// 어드민 페이지 월별 회원 탈퇴 사유 분석 API
export const mockWithdrawalReasonsStatsMonthly: WithdrawalReasonsStatsMonthly =
  {
    reason: 'OTHER',
    reason_label: '기타',
    // 최근 1년(2024-12 ~ 2025-11) 기간 반영
    from_date: '2024-12-01',
    to_date: '2025-11-30',
    // 기간 내 해당 사유(OTHER)로 탈퇴한 총 건수
    total: 1945,
    items: [
      { period: '2024-12', count: 100 },
      { period: '2025-01', count: 150 },
      { period: '2025-02', count: 150 },
      { period: '2025-03', count: 170 },
      { period: '2025-04', count: 150 },
      { period: '2025-05', count: 170 },
      { period: '2025-06', count: 160 },
      { period: '2025-07', count: 170 },
      { period: '2025-08', count: 150 },
      { period: '2025-09', count: 150 },
      { period: '2025-10', count: 200 },
      { period: '2025-11', count: 225 },
    ],
  }
export type WithdrawalReason =
  | 'NO_LONGER_NEEDED'
  | 'LACK_OF_INTEREST'
  | 'TOO_DIFFICULT'
  | 'FOUND_BETTER_SERVICE'
  | 'PRIVACY_CONCERNS'
  | 'POOR_SERVICE_QUALITY'
  | 'TECHNICAL_ISSUES'
  | 'LACK_OF_CONTENT'
  | 'OTHER'

export const mockWithdrawalReasonsStatsMonthlyMap: Record<
  WithdrawalReason,
  WithdrawalReasonsStatsMonthly
> = {
  NO_LONGER_NEEDED: {
    reason: 'NO_LONGER_NEEDED',
    reason_label: '더 이상 필요하지 않음',
    from_date: '2024-12-01',
    to_date: '2025-11-30',
    total: 1380,
    items: [
      { period: '2024-12', count: 80 },
      { period: '2025-01', count: 95 },
      { period: '2025-02', count: 110 },
      { period: '2025-03', count: 120 },
      { period: '2025-04', count: 115 },
      { period: '2025-05', count: 130 },
      { period: '2025-06', count: 140 },
      { period: '2025-07', count: 135 },
      { period: '2025-08', count: 125 },
      { period: '2025-09', count: 130 },
      { period: '2025-10', count: 145 },
      { period: '2025-11', count: 155 },
    ],
  },

  LACK_OF_INTEREST: {
    reason: 'LACK_OF_INTEREST',
    reason_label: '흥미 감소',
    from_date: '2024-12-01',
    to_date: '2025-11-30',
    total: 1025,
    items: [
      { period: '2024-12', count: 70 },
      { period: '2025-01', count: 80 },
      { period: '2025-02', count: 85 },
      { period: '2025-03', count: 90 },
      { period: '2025-04', count: 95 },
      { period: '2025-05', count: 100 },
      { period: '2025-06', count: 110 },
      { period: '2025-07', count: 105 },
      { period: '2025-08', count: 95 },
      { period: '2025-09', count: 100 },
      { period: '2025-10', count: 110 },
      { period: '2025-11', count: 120 },
    ],
  },

  TOO_DIFFICULT: {
    reason: 'TOO_DIFFICULT',
    reason_label: '사용이 너무 어려움',
    from_date: '2024-12-01',
    to_date: '2025-11-30',
    total: 780,
    items: [
      { period: '2024-12', count: 50 },
      { period: '2025-01', count: 55 },
      { period: '2025-02', count: 60 },
      { period: '2025-03', count: 65 },
      { period: '2025-04', count: 70 },
      { period: '2025-05', count: 75 },
      { period: '2025-06', count: 80 },
      { period: '2025-07', count: 85 },
      { period: '2025-08', count: 75 },
      { period: '2025-09', count: 80 },
      { period: '2025-10', count: 85 },
      { period: '2025-11', count: 90 },
    ],
  },

  FOUND_BETTER_SERVICE: {
    reason: 'FOUND_BETTER_SERVICE',
    reason_label: '더 좋은 서비스 발견',
    from_date: '2024-12-01',
    to_date: '2025-11-30',
    total: 890,
    items: [
      { period: '2024-12', count: 60 },
      { period: '2025-01', count: 65 },
      { period: '2025-02', count: 70 },
      { period: '2025-03', count: 75 },
      { period: '2025-04', count: 80 },
      { period: '2025-05', count: 85 },
      { period: '2025-06', count: 90 },
      { period: '2025-07', count: 95 },
      { period: '2025-08', count: 85 },
      { period: '2025-09', count: 90 },
      { period: '2025-10', count: 100 },
      { period: '2025-11', count: 115 },
    ],
  },

  PRIVACY_CONCERNS: {
    reason: 'PRIVACY_CONCERNS',
    reason_label: '개인정보 우려',
    from_date: '2024-12-01',
    to_date: '2025-11-30',
    total: 620,
    items: [
      { period: '2024-12', count: 40 },
      { period: '2025-01', count: 45 },
      { period: '2025-02', count: 50 },
      { period: '2025-03', count: 55 },
      { period: '2025-04', count: 50 },
      { period: '2025-05', count: 55 },
      { period: '2025-06', count: 60 },
      { period: '2025-07', count: 65 },
      { period: '2025-08', count: 55 },
      { period: '2025-09', count: 60 },
      { period: '2025-10', count: 70 },
      { period: '2025-11', count: 75 },
    ],
  },

  POOR_SERVICE_QUALITY: {
    reason: 'POOR_SERVICE_QUALITY',
    reason_label: '서비스 품질 불만',
    from_date: '2024-12-01',
    to_date: '2025-11-30',
    total: 740,
    items: [
      { period: '2024-12', count: 55 },
      { period: '2025-01', count: 60 },
      { period: '2025-02', count: 65 },
      { period: '2025-03', count: 70 },
      { period: '2025-04', count: 75 },
      { period: '2025-05', count: 80 },
      { period: '2025-06', count: 85 },
      { period: '2025-07', count: 90 },
      { period: '2025-08', count: 80 },
      { period: '2025-09', count: 85 },
      { period: '2025-10', count: 95 },
      { period: '2025-11', count: 100 },
    ],
  },

  TECHNICAL_ISSUES: {
    reason: 'TECHNICAL_ISSUES',
    reason_label: '기술적 문제',
    from_date: '2024-12-01',
    to_date: '2025-11-30',
    total: 880,
    items: [
      { period: '2024-12', count: 65 },
      { period: '2025-01', count: 75 },
      { period: '2025-02', count: 80 },
      { period: '2025-03', count: 90 },
      { period: '2025-04', count: 85 },
      { period: '2025-05', count: 90 },
      { period: '2025-06', count: 95 },
      { period: '2025-07', count: 100 },
      { period: '2025-08', count: 90 },
      { period: '2025-09', count: 95 },
      { period: '2025-10', count: 105 },
      { period: '2025-11', count: 110 },
    ],
  },

  LACK_OF_CONTENT: {
    reason: 'LACK_OF_CONTENT',
    reason_label: '콘텐츠 부족',
    from_date: '2024-12-01',
    to_date: '2025-11-30',
    total: 670,
    items: [
      { period: '2024-12', count: 45 },
      { period: '2025-01', count: 50 },
      { period: '2025-02', count: 55 },
      { period: '2025-03', count: 60 },
      { period: '2025-04', count: 65 },
      { period: '2025-05', count: 70 },
      { period: '2025-06', count: 75 },
      { period: '2025-07', count: 80 },
      { period: '2025-08', count: 70 },
      { period: '2025-09', count: 75 },
      { period: '2025-10', count: 85 },
      { period: '2025-11', count: 90 },
    ],
  },

  OTHER: {
    reason: 'OTHER',
    reason_label: '기타',
    from_date: '2024-12-01',
    to_date: '2025-11-30',
    total: 1945,
    items: [
      { period: '2024-12', count: 100 },
      { period: '2025-01', count: 150 },
      { period: '2025-02', count: 150 },
      { period: '2025-03', count: 170 },
      { period: '2025-04', count: 150 },
      { period: '2025-05', count: 170 },
      { period: '2025-06', count: 160 },
      { period: '2025-07', count: 170 },
      { period: '2025-08', count: 150 },
      { period: '2025-09', count: 150 },
      { period: '2025-10', count: 200 },
      { period: '2025-11', count: 225 },
    ],
  },
}

// api/v1/admin/lectures
// 어드민 페이지 강의 목록 조회 API
export const mockLecturesList: LectureList = {
  count: 4018,
  next: 'http://api.ozcoding.site/api/v1/admin/lectures?page=2&page_size=20',
  previous: null,
  results: [
    {
      id: 43001,
      title: '파이썬 입문',
      instructor: '김한영',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/python1.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/python-intro',
      created_at: '2025-11-01T10:00:00+09:00',
      updated_at: '2025-11-01T10:00:00+09:00',
    },
    {
      id: 43002,
      title: '자바스크립트 마스터',
      instructor: '이철수',
      thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/js.png',
      platform: 'UDEMY',
      url_link: 'https://www.udemy.com/course/js-master',
      created_at: '2025-11-02T11:00:00+09:00',
      updated_at: '2025-11-02T11:00:00+09:00',
    },
    {
      id: 43003,
      title: 'React 완전정복',
      instructor: '홍길동',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/react.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/react-master',
      created_at: '2025-11-03T12:00:00+09:00',
      updated_at: '2025-11-03T12:00:00+09:00',
    },
    {
      id: 43004,
      title: 'Vue.js로 웹 개발',
      instructor: '박민수',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/vue.png',
      platform: 'UDEMY',
      url_link: 'https://www.udemy.com/course/vue-web',
      created_at: '2025-11-04T13:00:00+09:00',
      updated_at: '2025-11-04T13:00:00+09:00',
    },
    {
      id: 43005,
      title: 'Node.js 백엔드',
      instructor: '최수지',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/node.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/node-backend',
      created_at: '2025-11-05T14:00:00+09:00',
      updated_at: '2025-11-05T14:00:00+09:00',
    },
    {
      id: 43006,
      title: 'AI 기초',
      instructor: '장우진',
      thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/ai.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/ai-basic',
      created_at: '2025-11-06T15:00:00+09:00',
      updated_at: '2025-11-06T15:00:00+09:00',
    },
    {
      id: 43007,
      title: '머신러닝 실전',
      instructor: '한지민',
      thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/ml.png',
      platform: 'UDEMY',
      url_link: 'https://www.udemy.com/course/ml-practice',
      created_at: '2025-11-07T16:00:00+09:00',
      updated_at: '2025-11-07T16:00:00+09:00',
    },
    {
      id: 43008,
      title: '딥러닝 완벽 가이드',
      instructor: '오세훈',
      thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/dl.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/dl-guide',
      created_at: '2025-11-08T17:00:00+09:00',
      updated_at: '2025-11-08T17:00:00+09:00',
    },
    {
      id: 43009,
      title: 'SQL과 데이터베이스',
      instructor: '유나리',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/sql.png',
      platform: 'UDEMY',
      url_link: 'https://www.udemy.com/course/sql-db',
      created_at: '2025-11-09T18:00:00+09:00',
      updated_at: '2025-11-09T18:00:00+09:00',
    },
    {
      id: 43010,
      title: 'AWS 클라우드 입문',
      instructor: '정도윤',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/aws.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/aws-intro',
      created_at: '2025-11-10T19:00:00+09:00',
      updated_at: '2025-11-10T19:00:00+09:00',
    },
    {
      id: 43011,
      title: 'Docker와 DevOps',
      instructor: '서지호',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/docker.png',
      platform: 'UDEMY',
      url_link: 'https://www.udemy.com/course/docker-devops',
      created_at: '2025-11-11T20:00:00+09:00',
      updated_at: '2025-11-11T20:00:00+09:00',
    },
    {
      id: 43012,
      title: '3시간 완성 n8n',
      instructor: 'SOLVIT team',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/image.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/3시간-완성-n8n',
      created_at: '2025-11-20T00:00:05.875842+09:00',
      updated_at: '2025-11-20T00:00:05.875842+09:00',
    },
    {
      id: 43013,
      title: 'Git & GitHub 마스터',
      instructor: '문다은',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/git.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/git-github',
      created_at: '2025-11-13T09:00:00+09:00',
      updated_at: '2025-11-13T09:00:00+09:00',
    },
    {
      id: 43014,
      title: 'HTML/CSS 웹 퍼블리싱',
      instructor: '신해준',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/htmlcss.png',
      platform: 'UDEMY',
      url_link: 'https://www.udemy.com/course/html-css',
      created_at: '2025-11-14T10:00:00+09:00',
      updated_at: '2025-11-14T10:00:00+09:00',
    },
    {
      id: 43015,
      title: '프론트엔드 실무',
      instructor: '강보라',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/frontend.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/frontend-practice',
      created_at: '2025-11-15T11:00:00+09:00',
      updated_at: '2025-11-15T11:00:00+09:00',
    },
    {
      id: 43016,
      title: '백엔드 실무',
      instructor: '노태현',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/backend.png',
      platform: 'UDEMY',
      url_link: 'https://www.udemy.com/course/backend-practice',
      created_at: '2025-11-16T12:00:00+09:00',
      updated_at: '2025-11-16T12:00:00+09:00',
    },
    {
      id: 43017,
      title: '데이터 분석 입문',
      instructor: '임다솔',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/data.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/data-analysis',
      created_at: '2025-11-17T13:00:00+09:00',
      updated_at: '2025-11-17T13:00:00+09:00',
    },
    {
      id: 43018,
      title: '통계로 보는 세상',
      instructor: '배지훈',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/stat.png',
      platform: 'UDEMY',
      url_link: 'https://www.udemy.com/course/statistics',
      created_at: '2025-11-18T14:00:00+09:00',
      updated_at: '2025-11-18T14:00:00+09:00',
    },
    {
      id: 43019,
      title: '파이썬 자동화',
      instructor: '권소연',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/automation.png',
      platform: 'INFLEARN',
      url_link: 'https://www.inflearn.com/course/python-automation',
      created_at: '2025-11-19T15:00:00+09:00',
      updated_at: '2025-11-19T15:00:00+09:00',
    },
    {
      id: 43020,
      title: 'UI/UX 디자인',
      instructor: '윤가은',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/uiux.png',
      platform: 'UDEMY',
      url_link: 'https://www.udemy.com/course/uiux-design',
      created_at: '2025-11-20T16:00:00+09:00',
      updated_at: '2025-11-20T16:00:00+09:00',
    },
  ],
}

// api/v1/admin/lectures/{lecture_id}
// 강의 상세 조회 - 전체 강의 상세 맵
export const mockLecturesDetailMap: Record<number, LecturesDetail> = {
  43001: {
    id: 43001,
    title: '파이썬 입문',
    instructor: '김한영',
    total_class_time: 180,
    original_price: 99000,
    discounted_price: 69000,
    difficulty: 'EASY',
    thumbnail_img_url:
      'https://example.com/images/lecture/thumbnails/python1.png',
    average_rating: 4.7,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/python-intro',
    categories: [
      { id: 1, name: 'Python' },
      { id: 2, name: '입문' },
    ],
    created_at: '2025-11-01T10:00:00+09:00',
    updated_at: '2025-11-01T10:00:00+09:00',
  },
  43002: {
    id: 43002,
    title: '자바스크립트 마스터',
    instructor: '이철수',
    total_class_time: 240,
    original_price: 120000,
    discounted_price: 89000,
    difficulty: 'NORMAL',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/js.png',
    average_rating: 4.5,
    platform: 'UDEMY',
    url_link: 'https://www.udemy.com/course/js-master',
    categories: [
      { id: 3, name: 'JavaScript' },
      { id: 4, name: '웹 프론트엔드' },
    ],
    created_at: '2025-11-02T11:00:00+09:00',
    updated_at: '2025-11-02T11:00:00+09:00',
  },
  43003: {
    id: 43003,
    title: 'React 완전정복',
    instructor: '홍길동',
    total_class_time: 300,
    original_price: 130000,
    discounted_price: 99000,
    difficulty: 'NORMAL',
    thumbnail_img_url:
      'https://example.com/images/lecture/thumbnails/react.png',
    average_rating: 4.8,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/react-master',
    categories: [
      { id: 5, name: 'React' },
      { id: 4, name: '웹 프론트엔드' },
    ],
    created_at: '2025-11-03T12:00:00+09:00',
    updated_at: '2025-11-03T12:00:00+09:00',
  },
  43004: {
    id: 43004,
    title: 'Vue.js로 웹 개발',
    instructor: '박민수',
    total_class_time: 240,
    original_price: 110000,
    discounted_price: 85000,
    difficulty: 'NORMAL',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/vue.png',
    average_rating: 4.3,
    platform: 'UDEMY',
    url_link: 'https://www.udemy.com/course/vue-web',
    categories: [
      { id: 6, name: 'Vue.js' },
      { id: 4, name: '웹 프론트엔드' },
    ],
    created_at: '2025-11-04T13:00:00+09:00',
    updated_at: '2025-11-04T13:00:00+09:00',
  },
  43005: {
    id: 43005,
    title: 'Node.js 백엔드',
    instructor: '최수지',
    total_class_time: 270,
    original_price: 115000,
    discounted_price: 89000,
    difficulty: 'NORMAL',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/node.png',
    average_rating: 4.4,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/node-backend',
    categories: [
      { id: 7, name: 'Node.js' },
      { id: 8, name: '백엔드' },
    ],
    created_at: '2025-11-05T14:00:00+09:00',
    updated_at: '2025-11-05T14:00:00+09:00',
  },
  43006: {
    id: 43006,
    title: 'AI 기초',
    instructor: '장우진',
    total_class_time: 180,
    original_price: 99000,
    discounted_price: 79000,
    difficulty: 'EASY',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/ai.png',
    average_rating: 4.2,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/ai-basic',
    categories: [
      { id: 9, name: 'AI 기초' },
      { id: 10, name: '머신러닝/딥러닝 입문' },
    ],
    created_at: '2025-11-06T15:00:00+09:00',
    updated_at: '2025-11-06T15:00:00+09:00',
  },
  43007: {
    id: 43007,
    title: '머신러닝 실전',
    instructor: '한지민',
    total_class_time: 320,
    original_price: 140000,
    discounted_price: 109000,
    difficulty: 'HARD',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/ml.png',
    average_rating: 4.6,
    platform: 'UDEMY',
    url_link: 'https://www.udemy.com/course/ml-practice',
    categories: [
      { id: 11, name: '머신러닝' },
      { id: 12, name: '실전 프로젝트' },
    ],
    created_at: '2025-11-07T16:00:00+09:00',
    updated_at: '2025-11-07T16:00:00+09:00',
  },
  43008: {
    id: 43008,
    title: '딥러닝 완벽 가이드',
    instructor: '오세훈',
    total_class_time: 360,
    original_price: 150000,
    discounted_price: 119000,
    difficulty: 'HARD',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/dl.png',
    average_rating: 4.7,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/dl-guide',
    categories: [
      { id: 13, name: '딥러닝' },
      { id: 10, name: '머신러닝/딥러닝 입문' },
    ],
    created_at: '2025-11-08T17:00:00+09:00',
    updated_at: '2025-11-08T17:00:00+09:00',
  },
  43009: {
    id: 43009,
    title: 'SQL과 데이터베이스',
    instructor: '유나리',
    total_class_time: 210,
    original_price: 90000,
    discounted_price: 69000,
    difficulty: 'NORMAL',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/sql.png',
    average_rating: 4.4,
    platform: 'UDEMY',
    url_link: 'https://www.udemy.com/course/sql-db',
    categories: [
      { id: 14, name: 'SQL' },
      { id: 15, name: '데이터베이스' },
    ],
    created_at: '2025-11-09T18:00:00+09:00',
    updated_at: '2025-11-09T18:00:00+09:00',
  },
  43010: {
    id: 43010,
    title: 'AWS 클라우드 입문',
    instructor: '정도윤',
    total_class_time: 200,
    original_price: 110000,
    discounted_price: 85000,
    difficulty: 'EASY',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/aws.png',
    average_rating: 4.3,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/aws-intro',
    categories: [
      { id: 16, name: '클라우드' },
      { id: 17, name: 'AWS' },
    ],
    created_at: '2025-11-10T19:00:00+09:00',
    updated_at: '2025-11-10T19:00:00+09:00',
  },
  43011: {
    id: 43011,
    title: 'Docker와 DevOps',
    instructor: '서지호',
    total_class_time: 220,
    original_price: 120000,
    discounted_price: 95000,
    difficulty: 'NORMAL',
    thumbnail_img_url:
      'https://example.com/images/lecture/thumbnails/docker.png',
    average_rating: 4.5,
    platform: 'UDEMY',
    url_link: 'https://www.udemy.com/course/docker-devops',
    categories: [
      { id: 18, name: 'DevOps' },
      { id: 19, name: 'Docker/Kubernetes' },
    ],
    created_at: '2025-11-11T20:00:00+09:00',
    updated_at: '2025-11-11T20:00:00+09:00',
  },
  43012: {
    // mockLecturesList의 id 43012 강의와 연결
    id: 43012,
    title: '3시간 완성 n8n',
    instructor: 'SOLVIT team',
    total_class_time: 180, // 3시간 완성 컨셉에 맞게 180분으로 설정
    original_price: 100000,
    discounted_price: 80000,
    difficulty: 'EASY',
    thumbnail_img_url:
      'https://example.com/images/lecture/thumbnails/image.png',
    average_rating: 4.3,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/3시간-완성-n8n',
    // 카테고리는 어드민에서 필터링/통계에 쓰일 수 있도록 태그성으로 구성
    categories: [
      {
        id: 20,
        name: '노코드 / 자동화',
      },
      {
        id: 21,
        name: '워크플로우 툴',
      },
    ],
    // mockLecturesList의 생성/수정일과 동일하게 맞춤
    created_at: '2025-11-20T00:00:05.875842+09:00',
    updated_at: '2025-11-20T00:00:05.875842+09:00',
  },
  43013: {
    id: 43013,
    title: 'Git & GitHub 마스터',
    instructor: '문다은',
    total_class_time: 180,
    original_price: 80000,
    discounted_price: 59000,
    difficulty: 'EASY',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/git.png',
    average_rating: 4.6,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/git-github',
    categories: [
      { id: 22, name: 'Git' },
      { id: 23, name: '협업 도구' },
    ],
    created_at: '2025-11-13T09:00:00+09:00',
    updated_at: '2025-11-13T09:00:00+09:00',
  },
  43014: {
    id: 43014,
    title: 'HTML/CSS 웹 퍼블리싱',
    instructor: '신해준',
    total_class_time: 200,
    original_price: 70000,
    discounted_price: 55000,
    difficulty: 'EASY',
    thumbnail_img_url:
      'https://example.com/images/lecture/thumbnails/htmlcss.png',
    average_rating: 4.4,
    platform: 'UDEMY',
    url_link: 'https://www.udemy.com/course/html-css',
    categories: [
      { id: 24, name: 'HTML/CSS' },
      { id: 4, name: '웹 프론트엔드' },
    ],
    created_at: '2025-11-14T10:00:00+09:00',
    updated_at: '2025-11-14T10:00:00+09:00',
  },
  43015: {
    id: 43015,
    title: '프론트엔드 실무',
    instructor: '강보라',
    total_class_time: 260,
    original_price: 130000,
    discounted_price: 99000,
    difficulty: 'NORMAL',
    thumbnail_img_url:
      'https://example.com/images/lecture/thumbnails/frontend.png',
    average_rating: 4.7,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/frontend-practice',
    categories: [
      { id: 25, name: '프론트엔드 실무' },
      { id: 4, name: '웹 프론트엔드' },
    ],
    created_at: '2025-11-15T11:00:00+09:00',
    updated_at: '2025-11-15T11:00:00+09:00',
  },
  43016: {
    id: 43016,
    title: '백엔드 실무',
    instructor: '노태현',
    total_class_time: 280,
    original_price: 130000,
    discounted_price: 99000,
    difficulty: 'NORMAL',
    thumbnail_img_url:
      'https://example.com/images/lecture/thumbnails/backend.png',
    average_rating: 4.5,
    platform: 'UDEMY',
    url_link: 'https://www.udemy.com/course/backend-practice',
    categories: [
      { id: 26, name: '백엔드 실무' },
      { id: 8, name: '백엔드' },
    ],
    created_at: '2025-11-16T12:00:00+09:00',
    updated_at: '2025-11-16T12:00:00+09:00',
  },
  43017: {
    id: 43017,
    title: '데이터 분석 입문',
    instructor: '임다솔',
    total_class_time: 210,
    original_price: 90000,
    discounted_price: 69000,
    difficulty: 'EASY',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/data.png',
    average_rating: 4.3,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/data-analysis',
    categories: [
      { id: 27, name: '데이터 분석' },
      { id: 28, name: '입문' },
    ],
    created_at: '2025-11-17T13:00:00+09:00',
    updated_at: '2025-11-17T13:00:00+09:00',
  },
  43018: {
    id: 43018,
    title: '통계로 보는 세상',
    instructor: '배지훈',
    total_class_time: 200,
    original_price: 85000,
    discounted_price: 65000,
    difficulty: 'NORMAL',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/stat.png',
    average_rating: 4.1,
    platform: 'UDEMY',
    url_link: 'https://www.udemy.com/course/statistics',
    categories: [
      { id: 29, name: '통계' },
      { id: 27, name: '데이터 분석' },
    ],
    created_at: '2025-11-18T14:00:00+09:00',
    updated_at: '2025-11-18T14:00:00+09:00',
  },
  43019: {
    id: 43019,
    title: '파이썬 자동화',
    instructor: '권소연',
    total_class_time: 190,
    original_price: 95000,
    discounted_price: 72000,
    difficulty: 'NORMAL',
    thumbnail_img_url:
      'https://example.com/images/lecture/thumbnails/automation.png',
    average_rating: 4.6,
    platform: 'INFLEARN',
    url_link: 'https://www.inflearn.com/course/python-automation',
    categories: [
      { id: 1, name: 'Python' },
      { id: 30, name: '업무 자동화' },
    ],
    created_at: '2025-11-19T15:00:00+09:00',
    updated_at: '2025-11-19T15:00:00+09:00',
  },
  43020: {
    id: 43020,
    title: 'UI/UX 디자인',
    instructor: '윤가은',
    total_class_time: 180,
    original_price: 100000,
    discounted_price: 79000,
    difficulty: 'EASY',
    thumbnail_img_url: 'https://example.com/images/lecture/thumbnails/uiux.png',
    average_rating: 4.5,
    platform: 'UDEMY',
    url_link: 'https://www.udemy.com/course/uiux-design',
    categories: [
      { id: 31, name: 'UI/UX' },
      { id: 32, name: '디자인' },
    ],
    created_at: '2025-11-20T16:00:00+09:00',
    updated_at: '2025-11-20T16:00:00+09:00',
  },
}

// 기존 핸들러 호환용 단일 상세 데이터 (id 43012)
export const mockLecturesDetail: LecturesDetail = mockLecturesDetailMap[43012]

// api/v1/admin/study-groups
// 스터디 그룹 목록 조회
export const mockStudyGroupList: StudyGroupList = {
  count: 100,
  next: 'http://api.ozcoding.site/api/v1/admin/study-groups/?page=2&page_size=20',
  previous: null,
  results: [
    {
      id: 1,
      name: 'python 스터디',
      start_at: '2025-11-01',
      end_at: '2025-11-20',
      max_headcount: 4,
      current_headcount: 4,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/image.png',
      status: 'ONGOING',
      created_at: '2025-11-20T00:00:05.875842+09:00',
      updated_at: '2025-11-20T00:00:05.875845+09:00',
    },
    {
      id: 2,
      name: '웹 프론트엔드 기초 스터디',
      start_at: '2025-11-05',
      end_at: '2025-12-05',
      max_headcount: 6,
      current_headcount: 3,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/frontend.png',
      status: 'ONGOING',
      created_at: '2025-11-04T09:00:00+09:00',
      updated_at: '2025-11-20T09:00:00+09:00',
    },
    {
      id: 3,
      name: 'React 심화 스터디',
      start_at: '2025-11-10',
      end_at: '2025-12-10',
      max_headcount: 8,
      current_headcount: 5,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/react.png',
      status: 'ONGOING',
      created_at: '2025-11-08T10:00:00+09:00',
      updated_at: '2025-11-20T10:00:00+09:00',
    },
    {
      id: 4,
      name: '알고리즘 & 코딩테스트 스터디',
      start_at: '2025-10-15',
      end_at: '2025-11-15',
      max_headcount: 5,
      current_headcount: 5,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/algorithm.png',
      status: 'ENDED',
      created_at: '2025-10-10T09:30:00+09:00',
      updated_at: '2025-11-15T22:00:00+09:00',
    },
    {
      id: 5,
      name: '데이터 분석 입문 스터디',
      start_at: '2025-11-03',
      end_at: '2025-12-03',
      max_headcount: 6,
      current_headcount: 4,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/data.png',
      status: 'ONGOING',
      created_at: '2025-11-01T11:00:00+09:00',
      updated_at: '2025-11-20T11:00:00+09:00',
    },
    {
      id: 6,
      name: '머신러닝 이론 스터디',
      start_at: '2025-11-18',
      end_at: '2025-12-18',
      max_headcount: 7,
      current_headcount: 2,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/ml.png',
      status: 'PENDING',
      created_at: '2025-11-12T12:00:00+09:00',
      updated_at: '2025-11-18T12:00:00+09:00',
    },
    {
      id: 7,
      name: 'CS 기초 개념 정리 스터디',
      start_at: '2025-10-20',
      end_at: '2025-11-20',
      max_headcount: 10,
      current_headcount: 9,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/cs.png',
      status: 'ONGOING',
      created_at: '2025-10-18T09:00:00+09:00',
      updated_at: '2025-11-19T21:00:00+09:00',
    },
    {
      id: 8,
      name: 'SQL & 데이터베이스 스터디',
      start_at: '2025-09-01',
      end_at: '2025-10-01',
      max_headcount: 5,
      current_headcount: 3,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/sql.png',
      status: 'ENDED',
      created_at: '2025-08-25T10:00:00+09:00',
      updated_at: '2025-10-01T23:00:00+09:00',
    },
    {
      id: 9,
      name: 'AWS 클라우드 입문 스터디',
      start_at: '2025-11-07',
      end_at: '2025-12-07',
      max_headcount: 6,
      current_headcount: 6,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/aws.png',
      status: 'ONGOING',
      created_at: '2025-11-05T09:00:00+09:00',
      updated_at: '2025-11-20T09:30:00+09:00',
    },
    {
      id: 10,
      name: 'Git & GitHub 협업 스터디',
      start_at: '2025-10-10',
      end_at: '2025-11-05',
      max_headcount: 8,
      current_headcount: 8,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/git.png',
      status: 'ENDED',
      created_at: '2025-10-01T11:00:00+09:00',
      updated_at: '2025-11-05T21:00:00+09:00',
    },
    {
      id: 11,
      name: 'TypeScript 완전 정복 스터디',
      start_at: '2025-11-15',
      end_at: '2025-12-15',
      max_headcount: 6,
      current_headcount: 4,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/ts.png',
      status: 'PENDING',
      created_at: '2025-11-10T10:00:00+09:00',
      updated_at: '2025-11-15T10:00:00+09:00',
    },
    {
      id: 12,
      name: 'Node.js 백엔드 기초 스터디',
      start_at: '2025-11-02',
      end_at: '2025-12-02',
      max_headcount: 5,
      current_headcount: 3,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/node.png',
      status: 'ONGOING',
      created_at: '2025-10-30T13:00:00+09:00',
      updated_at: '2025-11-20T13:00:00+09:00',
    },
    {
      id: 13,
      name: 'Vue.js 입문 스터디',
      start_at: '2025-11-09',
      end_at: '2025-12-09',
      max_headcount: 5,
      current_headcount: 2,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/vue.png',
      status: 'ONGOING',
      created_at: '2025-11-06T09:00:00+09:00',
      updated_at: '2025-11-19T09:00:00+09:00',
    },
    {
      id: 14,
      name: '면접 대비 CS 질문 스터디',
      start_at: '2025-10-25',
      end_at: '2025-11-25',
      max_headcount: 6,
      current_headcount: 6,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/interview.png',
      status: 'ONGOING',
      created_at: '2025-10-20T20:00:00+09:00',
      updated_at: '2025-11-20T20:00:00+09:00',
    },
    {
      id: 15,
      name: '코딩 테스트 실전 문제 풀이',
      start_at: '2025-09-15',
      end_at: '2025-10-15',
      max_headcount: 10,
      current_headcount: 7,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/codingtest.png',
      status: 'ENDED',
      created_at: '2025-09-10T09:00:00+09:00',
      updated_at: '2025-10-15T23:00:00+09:00',
    },
    {
      id: 16,
      name: 'Django로 웹 서비스 만들기',
      start_at: '2025-11-12',
      end_at: '2025-12-12',
      max_headcount: 5,
      current_headcount: 4,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/django.png',
      status: 'ONGOING',
      created_at: '2025-11-08T14:00:00+09:00',
      updated_at: '2025-11-20T14:00:00+09:00',
    },
    {
      id: 17,
      name: 'Spring Boot 백엔드 스터디',
      start_at: '2025-11-01',
      end_at: '2025-12-01',
      max_headcount: 7,
      current_headcount: 5,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/spring.png',
      status: 'ONGOING',
      created_at: '2025-10-28T09:00:00+09:00',
      updated_at: '2025-11-20T09:00:00+09:00',
    },
    {
      id: 18,
      name: 'AI 서비스 기획 & 구현 스터디',
      start_at: '2025-11-22',
      end_at: '2025-12-22',
      max_headcount: 8,
      current_headcount: 3,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/ai.png',
      status: 'PENDING',
      created_at: '2025-11-18T15:00:00+09:00',
      updated_at: '2025-11-22T15:00:00+09:00',
    },
    {
      id: 19,
      name: 'UI/UX 디자인 이론 스터디',
      start_at: '2025-10-05',
      end_at: '2025-11-05',
      max_headcount: 6,
      current_headcount: 4,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/uiux.png',
      status: 'ENDED',
      created_at: '2025-10-01T16:00:00+09:00',
      updated_at: '2025-11-05T23:00:00+09:00',
    },
    {
      id: 20,
      name: '풀스택 웹 서비스 런칭 스터디',
      start_at: '2025-11-14',
      end_at: '2025-12-31',
      max_headcount: 10,
      current_headcount: 6,
      profile_img_url:
        'https://example.com/images/study_groups/thumbnails/fullstack.png',
      status: 'ONGOING',
      created_at: '2025-11-10T18:00:00+09:00',
      updated_at: '2025-11-20T18:00:00+09:00',
    },
  ],
}

// api/v1/admin/study-groups/{group_id}
// 스터디 그룹 상세 조회
export const mockStudyGroupDetail: StudyGroupDetail = {
  id: 1,
  name: 'python 스터디',
  start_at: '2025-11-01',
  end_at: '2025-11-20',
  max_headcount: 4,
  current_headcount: 4,
  uuid: 'group_uuid_001',
  profile_img_url:
    'https://example.com/images/study_groups/thumbnails/image.png',
  status: 'ONGOING',
  // mockLectureList에 있는 파이썬 관련 강의들과 연결
  lectures: [
    {
      id: 43001,
      title: '파이썬 입문',
      instructor: '김한영',
      profile_img_url:
        'https://example.com/images/lecture/thumbnails/python1.png',
      url_link: 'https://www.inflearn.com/course/python-intro',
    },
    {
      id: 43019,
      title: '파이썬 자동화',
      instructor: '권소연',
      profile_img_url:
        'https://example.com/images/lecture/thumbnails/automation.png',
      url_link: 'https://www.inflearn.com/course/python-automation',
    },
  ],
  // mockAccountDetail / mockAccountLists의 1~4번 유저와 연결
  members: [
    {
      id: 1,
      nickname: 'hong1', // 리더
      is_leader: true,
    },
    {
      id: 2,
      nickname: 'young2',
      is_leader: false,
    },
    {
      id: 3,
      nickname: 'chul3',
      is_leader: false,
    },
    {
      id: 4,
      nickname: 'min4',
      is_leader: false,
    },
  ],
  created_at: '2025-11-20T00:00:05.875842+09:00',
  updated_at: '2025-11-20T00:00:05.875845+09:00',
}

// api/v1/admin/study-reviews
// 스터디 리뷰 목록 조회
export const mockStudyReviewList: StudyReviewList = {
  count: 100,
  next: 'http://api.ozcoding.site/api/v1/admin/study-reviews?page=2&page_size=20',
  previous: null,
  results: [
    {
      id: 1,
      study_group: {
        id: 1,
        name: 'python 스터디',
      },
      author: {
        id: 1,
        nickname: 'hong1',
        email: 'user1@example.com',
      },
      star_rating: 5,
      content: '파이썬 기초를 탄탄하게 다질 수 있었어요.',
      created_at: '2025-11-20T09:00:00+09:00',
      updated_at: '2025-11-20T09:00:00+09:00',
    },
    {
      id: 2,
      study_group: {
        id: 1,
        name: 'python 스터디',
      },
      author: {
        id: 2,
        nickname: 'young2',
        email: 'user2@example.com',
      },
      star_rating: 4,
      content: '진도는 빨랐지만 꾸준히 따라가면 도움 많이 됩니다.',
      created_at: '2025-11-20T09:10:00+09:00',
      updated_at: '2025-11-20T09:10:00+09:00',
    },
    {
      id: 3,
      study_group: {
        id: 2,
        name: '웹 프론트엔드 기초 스터디',
      },
      author: {
        id: 3,
        nickname: 'chul3',
        email: 'user3@example.com',
      },
      star_rating: 5,
      content: 'HTML/CSS 기초를 다시 정리하기에 딱 좋았습니다.',
      created_at: '2025-11-20T09:20:00+09:00',
      updated_at: '2025-11-20T09:20:00+09:00',
    },
    {
      id: 4,
      study_group: {
        id: 2,
        name: '웹 프론트엔드 기초 스터디',
      },
      author: {
        id: 4,
        nickname: 'min4',
        email: 'user4@example.com',
      },
      star_rating: 3,
      content: '전반적으로 좋았지만 과제가 조금 많았어요.',
      created_at: '2025-11-20T09:30:00+09:00',
      updated_at: '2025-11-20T09:30:00+09:00',
    },
    {
      id: 5,
      study_group: {
        id: 3,
        name: 'React 심화 스터디',
      },
      author: {
        id: 5,
        nickname: 'suji5',
        email: 'user5@example.com',
      },
      star_rating: 5,
      content: '실무에서 바로 쓸 수 있는 React 패턴을 많이 배웠습니다.',
      created_at: '2025-11-20T09:40:00+09:00',
      updated_at: '2025-11-20T09:40:00+09:00',
    },
    {
      id: 6,
      study_group: {
        id: 3,
        name: 'React 심화 스터디',
      },
      author: {
        id: 6,
        nickname: 'woo6',
        email: 'user6@example.com',
      },
      star_rating: 4,
      content: 'Hook과 상태 관리에 대한 이해가 많이 깊어졌어요.',
      created_at: '2025-11-20T09:50:00+09:00',
      updated_at: '2025-11-20T09:50:00+09:00',
    },
    {
      id: 7,
      study_group: {
        id: 4,
        name: '알고리즘 & 코딩테스트 스터디',
      },
      author: {
        id: 7,
        nickname: 'jimin7',
        email: 'user7@example.com',
      },
      star_rating: 5,
      content: '코딩테스트 기초를 잡는 데 큰 도움이 됐습니다.',
      created_at: '2025-11-20T10:00:00+09:00',
      updated_at: '2025-11-20T10:00:00+09:00',
    },
    {
      id: 8,
      study_group: {
        id: 4,
        name: '알고리즘 & 코딩테스트 스터디',
      },
      author: {
        id: 8,
        nickname: 'sehun8',
        email: 'user8@example.com',
      },
      star_rating: 4,
      content: '문제가 어렵지만 꾸준히 하면 확실히 실력이 느는 스터디입니다.',
      created_at: '2025-11-20T10:10:00+09:00',
      updated_at: '2025-11-20T10:10:00+09:00',
    },
    {
      id: 9,
      study_group: {
        id: 5,
        name: '데이터 분석 입문 스터디',
      },
      author: {
        id: 9,
        nickname: 'nari9',
        email: 'user9@example.com',
      },
      star_rating: 4,
      content: '파이썬으로 데이터 분석 맛보기를 하기 좋은 스터디였어요.',
      created_at: '2025-11-20T10:20:00+09:00',
      updated_at: '2025-11-20T10:20:00+09:00',
    },
    {
      id: 10,
      study_group: {
        id: 5,
        name: '데이터 분석 입문 스터디',
      },
      author: {
        id: 10,
        nickname: 'doyun10',
        email: 'user10@example.com',
      },
      star_rating: 5,
      content: '실습 위주라서 지루할 틈이 없었습니다.',
      created_at: '2025-11-20T10:30:00+09:00',
      updated_at: '2025-11-20T10:30:00+09:00',
    },
    {
      id: 11,
      study_group: {
        id: 6,
        name: '머신러닝 이론 스터디',
      },
      author: {
        id: 11,
        nickname: 'jiho11',
        email: 'user11@example.com',
      },
      star_rating: 3,
      content: '수학 내용이 많아서 조금 어려웠지만 개념 정리는 잘 됐어요.',
      created_at: '2025-11-20T10:40:00+09:00',
      updated_at: '2025-11-20T10:40:00+09:00',
    },
    {
      id: 12,
      study_group: {
        id: 6,
        name: '머신러닝 이론 스터디',
      },
      author: {
        id: 12,
        nickname: 'daeun12',
        email: 'user12@example.com',
      },
      star_rating: 4,
      content: '이론 위주지만 정리 자료가 잘 되어 있어서 복습하기 좋았습니다.',
      created_at: '2025-11-20T10:50:00+09:00',
      updated_at: '2025-11-20T10:50:00+09:00',
    },
    {
      id: 13,
      study_group: {
        id: 7,
        name: 'CS 기초 개념 정리 스터디',
      },
      author: {
        id: 13,
        nickname: 'hae13',
        email: 'user13@example.com',
      },
      star_rating: 5,
      content: '네트워크, 운영체제 등 전반적인 CS 개념을 훑기 좋았어요.',
      created_at: '2025-11-20T11:00:00+09:00',
      updated_at: '2025-11-20T11:00:00+09:00',
    },
    {
      id: 14,
      study_group: {
        id: 7,
        name: 'CS 기초 개념 정리 스터디',
      },
      author: {
        id: 14,
        nickname: 'bora14',
        email: 'user14@example.com',
      },
      star_rating: 4,
      content: '면접 대비용으로 요약해 두기 좋은 자료들이 많았습니다.',
      created_at: '2025-11-20T11:10:00+09:00',
      updated_at: '2025-11-20T11:10:00+09:00',
    },
    {
      id: 15,
      study_group: {
        id: 8,
        name: 'SQL & 데이터베이스 스터디',
      },
      author: {
        id: 15,
        nickname: 'tae15',
        email: 'user15@example.com',
      },
      star_rating: 4,
      content: '조인, 인덱스 같은 개념을 실습과 함께 배울 수 있었습니다.',
      created_at: '2025-11-20T11:20:00+09:00',
      updated_at: '2025-11-20T11:20:00+09:00',
    },
    {
      id: 16,
      study_group: {
        id: 8,
        name: 'SQL & 데이터베이스 스터디',
      },
      author: {
        id: 16,
        nickname: 'dasol16',
        email: 'user16@example.com',
      },
      star_rating: 5,
      content: '실무에서 바로 쓸 수 있는 쿼리 예제가 많아서 좋았습니다.',
      created_at: '2025-11-20T11:30:00+09:00',
      updated_at: '2025-11-20T11:30:00+09:00',
    },
    {
      id: 17,
      study_group: {
        id: 9,
        name: 'AWS 클라우드 입문 스터디',
      },
      author: {
        id: 17,
        nickname: 'jihoon17',
        email: 'user17@example.com',
      },
      star_rating: 4,
      content: '기초 서비스 위주로 다뤄줘서 처음 접하기에 부담 없었습니다.',
      created_at: '2025-11-20T11:40:00+09:00',
      updated_at: '2025-11-20T11:40:00+09:00',
    },
    {
      id: 18,
      study_group: {
        id: 9,
        name: 'AWS 클라우드 입문 스터디',
      },
      author: {
        id: 18,
        nickname: 'soyeon18',
        email: 'user18@example.com',
      },
      star_rating: 5,
      content: '콘솔 실습을 많이 해서 실제로 써보는 경험을 할 수 있었습니다.',
      created_at: '2025-11-20T11:50:00+09:00',
      updated_at: '2025-11-20T11:50:00+09:00',
    },
    {
      id: 19,
      study_group: {
        id: 10,
        name: 'Git & GitHub 협업 스터디',
      },
      author: {
        id: 19,
        nickname: 'gaeun19',
        email: 'user19@example.com',
      },
      star_rating: 5,
      content: '브랜치 전략과 PR 리뷰 흐름을 연습해볼 수 있어서 좋았어요.',
      created_at: '2025-11-20T12:00:00+09:00',
      updated_at: '2025-11-20T12:00:00+09:00',
    },
    {
      id: 20,
      study_group: {
        id: 10,
        name: 'Git & GitHub 협업 스터디',
      },
      author: {
        id: 20,
        nickname: 'haneul20',
        email: 'user20@example.com',
      },
      star_rating: 4,
      content:
        '실수도 해보면서 협업 플로우를 몸에 익힐 수 있는 스터디였습니다.',
      created_at: '2025-11-20T12:10:00+09:00',
      updated_at: '2025-11-20T12:10:00+09:00',
    },
  ],
}

// api/v1/admin/study-reviews/{review_id}
// 스터디 리뷰 상세보기
export const mockStudyReviewDetail: StudyReviewDetail = {
  id: 1,
  study_group: {
    // mockStudyGroupList / mockStudyGroupDetail의 첫 번째 스터디와 연결
    id: 1,
    name: 'python 스터디',
    start_at: '2025-11-01',
    end_at: '2025-11-20',
    introduction: '파이썬 깨부실분들 구합니다.',
  },
  author: {
    // mockAccountDetail / mockAccountLists의 1번 유저와 연결
    id: 1,
    nickname: 'hong1',
    email: 'user1@example.com',
  },
  star_rating: 5,
  content: '재밌게 놀다 갑니다.',
  created_at: '2025-11-20T00:00:05.875842+09:00',
  updated_at: '2025-11-20T00:00:05.875845+09:00',
}

// =================================== recruitment ===================================
// =================================== recruitment ===================================

// api/v1/recruitment-tags
// 태그 목록 조회
export const mockRecruitmentTags: RecruitmentTags = {
  count: 100,
  next: 'http://api.ozcoding.site/api/v1/recruitments-tags/page=2&page_size=10',
  previous: null,
  results: [
    { id: 1, name: 'React' },
    { id: 2, name: 'Vue.js' },
    { id: 3, name: 'Angular' },
    { id: 4, name: 'JavaScript' },
    { id: 5, name: 'TypeScript' },
    { id: 6, name: 'Spring Boot' },
    { id: 7, name: 'Node.js' },
    { id: 8, name: 'Express' },
    { id: 9, name: 'NextJS' },
    { id: 10, name: 'Java' },
    { id: 11, name: 'Python' },
    { id: 12, name: 'Django' },
    { id: 13, name: 'FastAPI' },
    { id: 14, name: 'Flask' },
    { id: 15, name: 'PHP' },
    { id: 16, name: 'Docker' },
    { id: 17, name: 'Kubernetes' },
    { id: 18, name: 'AWS' },
    { id: 19, name: 'Azure' },
    { id: 20, name: 'GCP' },
    { id: 21, name: 'FrontEnd' },
    { id: 22, name: 'Backend' },
    { id: 23, name: 'Full Stack' },
    { id: 24, name: 'DevOps' },
    { id: 25, name: 'AI' },
    { id: 26, name: 'ML' },
    { id: 27, name: '데이터분석' },
    { id: 28, name: '데이터사이언스' },
    { id: 29, name: '웹개발' },
    { id: 30, name: '모바일' },
    { id: 31, name: '실무' },
    { id: 32, name: '프로젝트' },
    { id: 33, name: '포트폴리오' },
    { id: 34, name: '취업' },
    { id: 35, name: '신입' },
    { id: 36, name: '경력' },
    { id: 37, name: '온라인' },
    { id: 38, name: '오프라인' },
    { id: 39, name: '주말' },
    { id: 40, name: '평일' },
  ],
}

// api/v1/admin/recruitments
// 스터디 모집 공고 목록 조회
export const mockRecruitmentList: RecruitmentList = {
  count: 100,
  next: 'http://api.ozcoding.site/api/v1/admin/recruitments?page=2&page_size=20',
  previous: null,
  results: [
    {
      id: 1,
      title: '파이썬 입문 온라인 스터디 모집',
      views_count: 213,
      bookmark_count: 100,
      is_closed: false,
      tags: [
        { id: 11, name: 'Python' },
        { id: 27, name: '데이터분석' },
        { id: 37, name: '온라인' },
        { id: 21, name: 'FrontEnd' },
        { id: 29, name: '웹개발' },
        { id: 35, name: '신입' },
        { id: 31, name: '실무' },
        { id: 32, name: '프로젝트' },
        { id: 25, name: 'AI' },
        { id: 26, name: 'ML' },
      ],
      close_at: '2025-11-20T00:00:05.875842+09:00',
      created_at: '2025-11-10T09:00:00+09:00',
      updated_at: '2025-11-10T09:00:00+09:00',
    },
    {
      id: 2,
      title: '파이썬 알고리즘·코딩테스트 대비 스터디',
      views_count: 120,
      bookmark_count: 45,
      is_closed: false,
      tags: [
        { id: 11, name: 'Python' },
        { id: 31, name: '실무' },
      ],
      close_at: '2025-11-21T00:00:00+09:00',
      created_at: '2025-11-11T09:00:00+09:00',
      updated_at: '2025-11-11T09:00:00+09:00',
    },
    {
      id: 3,
      title: '웹 프론트엔드 기초(HTML/CSS) 스터디원 모집',
      views_count: 300,
      bookmark_count: 150,
      is_closed: false,
      tags: [
        { id: 21, name: 'FrontEnd' },
        { id: 29, name: '웹개발' },
        { id: 35, name: '신입' },
      ],
      close_at: '2025-11-22T00:00:00+09:00',
      created_at: '2025-11-12T09:00:00+09:00',
      updated_at: '2025-11-12T09:00:00+09:00',
    },
    {
      id: 4,
      title: 'React 입문 + 실전 과제 스터디',
      views_count: 98,
      bookmark_count: 20,
      is_closed: false,
      tags: [
        { id: 1, name: 'React' },
        { id: 21, name: 'FrontEnd' },
        { id: 32, name: '프로젝트' },
      ],
      close_at: '2025-11-23T00:00:00+09:00',
      created_at: '2025-11-13T09:00:00+09:00',
      updated_at: '2025-11-13T09:00:00+09:00',
    },
    {
      id: 5,
      title: '데이터 분석 입문(파이썬) 스터디',
      views_count: 450,
      bookmark_count: 200,
      is_closed: false,
      tags: [
        { id: 27, name: '데이터분석' },
        { id: 11, name: 'Python' },
      ],
      close_at: '2025-11-24T00:00:00+09:00',
      created_at: '2025-11-14T09:00:00+09:00',
      updated_at: '2025-11-14T09:00:00+09:00',
    },
    {
      id: 6,
      title: '머신러닝 이론 정리 스터디',
      views_count: 56,
      bookmark_count: 10,
      is_closed: true,
      tags: [
        { id: 25, name: 'AI' },
        { id: 26, name: 'ML' },
        { id: 27, name: '데이터분석' },
      ],
      close_at: '2025-11-15T00:00:00+09:00',
      created_at: '2025-11-05T09:00:00+09:00',
      updated_at: '2025-11-16T09:00:00+09:00',
    },
    {
      id: 7,
      title: '코딩테스트 하루 한 문제 챌린지',
      views_count: 180,
      bookmark_count: 60,
      is_closed: false,
      tags: [
        { id: 29, name: '웹개발' },
        { id: 31, name: '실무' },
        { id: 39, name: '주말' },
      ],
      close_at: '2025-11-25T00:00:00+09:00',
      created_at: '2025-11-16T09:00:00+09:00',
      updated_at: '2025-11-16T09:00:00+09:00',
    },
    {
      id: 8,
      title: 'TypeScript 완전 정복 스터디',
      views_count: 220,
      bookmark_count: 80,
      is_closed: false,
      tags: [
        { id: 5, name: 'TypeScript' },
        { id: 21, name: 'FrontEnd' },
        { id: 31, name: '실무' },
        { id: 32, name: '프로젝트' },
      ],
      close_at: '2025-11-26T00:00:00+09:00',
      created_at: '2025-11-17T09:00:00+09:00',
      updated_at: '2025-11-17T09:00:00+09:00',
    },
    {
      id: 9,
      title: 'Git & GitHub 협업 플로우 스터디',
      views_count: 75,
      bookmark_count: 25,
      is_closed: false,
      tags: [{ id: 24, name: 'DevOps' }],
      close_at: '2025-11-27T00:00:00+09:00',
      created_at: '2025-11-18T09:00:00+09:00',
      updated_at: '2025-11-18T09:00:00+09:00',
    },
    {
      id: 10,
      title: 'AWS 클라우드 기초 개념 스터디',
      views_count: 500,
      bookmark_count: 220,
      is_closed: true,
      tags: [
        { id: 18, name: 'AWS' },
        { id: 24, name: 'DevOps' },
      ],
      close_at: '2025-11-19T00:00:00+09:00',
      created_at: '2025-11-09T09:00:00+09:00',
      updated_at: '2025-11-20T09:00:00+09:00',
    },
    {
      id: 11,
      title: 'CS 기초 개념(운영체제·네트워크) 스터디',
      views_count: 160,
      bookmark_count: 50,
      is_closed: false,
      tags: [
        { id: 29, name: '웹개발' },
        { id: 31, name: '실무' },
        { id: 35, name: '신입' },
      ],
      close_at: '2025-11-28T00:00:00+09:00',
      created_at: '2025-11-19T09:00:00+09:00',
      updated_at: '2025-11-19T09:00:00+09:00',
    },
    {
      id: 12,
      title: 'Node.js 백엔드 입문 스터디',
      views_count: 210,
      bookmark_count: 90,
      is_closed: false,
      tags: [
        { id: 7, name: 'Node.js' },
        { id: 22, name: 'Backend' },
      ],
      close_at: '2025-11-29T00:00:00+09:00',
      created_at: '2025-11-20T09:00:00+09:00',
      updated_at: '2025-11-20T09:00:00+09:00',
    },
    {
      id: 13,
      title: 'Vue.js 입문 주 2회 온라인 스터디',
      views_count: 134,
      bookmark_count: 40,
      is_closed: false,
      tags: [
        { id: 2, name: 'Vue.js' },
        { id: 21, name: 'FrontEnd' },
        { id: 37, name: '온라인' },
      ],
      close_at: '2025-11-30T00:00:00+09:00',
      created_at: '2025-11-21T09:00:00+09:00',
      updated_at: '2025-11-21T09:00:00+09:00',
    },
    {
      id: 14,
      title: 'Django로 투두 앱 만들기 스터디',
      views_count: 320,
      bookmark_count: 130,
      is_closed: true,
      tags: [
        { id: 12, name: 'Django' },
        { id: 22, name: 'Backend' },
        { id: 32, name: '프로젝트' },
      ],
      close_at: '2025-11-18T00:00:00+09:00',
      created_at: '2025-11-08T09:00:00+09:00',
      updated_at: '2025-11-19T09:00:00+09:00',
    },
    {
      id: 15,
      title: 'UI/UX 디자인 개념 정리 스터디',
      views_count: 190,
      bookmark_count: 70,
      is_closed: false,
      tags: [
        { id: 29, name: '웹개발' },
        { id: 33, name: '포트폴리오' },
      ],
      close_at: '2025-12-01T00:00:00+09:00',
      created_at: '2025-11-22T09:00:00+09:00',
      updated_at: '2025-11-22T09:00:00+09:00',
    },
    {
      id: 16,
      title: '풀스택 사이드 프로젝트 런칭 스터디',
      views_count: 260,
      bookmark_count: 110,
      is_closed: false,
      tags: [
        { id: 23, name: 'Full Stack' },
        { id: 32, name: '프로젝트' },
        { id: 36, name: '경력' },
      ],
      close_at: '2025-12-02T00:00:00+09:00',
      created_at: '2025-11-23T09:00:00+09:00',
      updated_at: '2025-11-23T09:00:00+09:00',
    },
    {
      id: 17,
      title: '통계 기초 + 데이터 분석 스터디',
      views_count: 140,
      bookmark_count: 55,
      is_closed: false,
      tags: [
        { id: 27, name: '데이터분석' },
        { id: 28, name: '데이터사이언스' },
      ],
      close_at: '2025-12-03T00:00:00+09:00',
      created_at: '2025-11-24T09:00:00+09:00',
      updated_at: '2025-11-24T09:00:00+09:00',
    },
    {
      id: 18,
      title: 'AI 서비스 기획 & 프로토타입 스터디',
      views_count: 305,
      bookmark_count: 160,
      is_closed: true,
      tags: [
        { id: 25, name: 'AI' },
        { id: 32, name: '프로젝트' },
      ],
      close_at: '2025-11-17T00:00:00+09:00',
      created_at: '2025-11-07T09:00:00+09:00',
      updated_at: '2025-11-18T09:00:00+09:00',
    },
    {
      id: 19,
      title: '프론트엔드 포트폴리오 리뷰 스터디',
      views_count: 110,
      bookmark_count: 35,
      is_closed: false,
      tags: [
        { id: 21, name: 'FrontEnd' },
        { id: 33, name: '포트폴리오' },
        { id: 34, name: '취업' },
      ],
      close_at: '2025-12-04T00:00:00+09:00',
      created_at: '2025-11-25T09:00:00+09:00',
      updated_at: '2025-11-25T09:00:00+09:00',
    },
    {
      id: 20,
      title: '주말 아침 알고리즘 스터디(온라인)',
      views_count: 280,
      bookmark_count: 120,
      is_closed: false,
      tags: [
        { id: 29, name: '웹개발' },
        { id: 31, name: '실무' },
        { id: 37, name: '온라인' },
        { id: 39, name: '주말' },
      ],
      close_at: '2025-12-05T00:00:00+09:00',
      created_at: '2025-11-26T09:00:00+09:00',
      updated_at: '2025-11-26T09:00:00+09:00',
    },
  ],
}

// api/v1/admin/recruitments/{recruitment_id}
// 스터디 모집 공고 상세 조회
export const mockRecruitmentDetail: RecruitmentDetail = {
  id: 1,
  uuid: 'b8dbd77f-cf73-4ef4-9914-4394d5ab366e',
  title: 'python 스터디 모집 공고 1',
  content: `


  # 스터디 소개

파이썬을 함께 공부할 스터디원을 모집하는 공고입니다.  
온라인 강의를 함께 들으면서 개념을 정리하고, 실전 문제도 같이 풀어봅니다.
---
## 이런 분과 함께해요

- 파이썬 기초를 다시 복습하고 싶은 분
- 온라인 스터디로 꾸준히 학습 루틴을 만들고 싶은 분
- 질의응답과 코드 리뷰를 통해 성장하고 싶은 분

### 진행 방식

- 주 2회 온라인 진행 (디스코드 / 줌)
- 매 회차 인프런 강의 수강 후 정리 및 실습
- 과제 코드를 GitHub 레포지토리로 공유 후 간단 리뷰
`,
  thumbnail_img_url:
    'https://example.com/uploads/recruitments/images/image.png',
  expected_headcount: 5,
  expected_payment_amount: 59000, // 예상 결제 금액(원)
  close_at: '2025-11-20T00:00:05.875842+09:00',
  is_closed: false,
  views_count: 1231,
  bookmark_count: 11,
  created_at: '2025-11-20T00:00:05.875842+09:00',
  updated_at: '2025-11-20T00:00:05.875845+09:00',
  // mockLectureList에 있는 강의들을 기반으로 연결
  lectures: [
    {
      id: 43001,
      title: '파이썬 입문',
      instructor: '김한영',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/python1.png',
      url_link: 'https://www.inflearn.com/course/python-intro',
    },
    {
      id: 43003,
      title: 'React 완전정복',
      instructor: '홍길동',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/react.png',
      url_link: 'https://www.inflearn.com/course/react-master',
    },
    {
      id: 43012,
      title: '3시간 완성 n8n',
      instructor: 'SOLVIT team',
      thumbnail_img_url:
        'https://example.com/images/lecture/thumbnails/image.png',
      url_link: 'https://www.inflearn.com/course/3시간-완성-n8n',
    },
  ],
  // ApplicationsDetail / mockApplicationsDetail의 태그와 맞춰 확장
  tags: [
    {
      id: 1,
      name: 'python',
    },
    {
      id: 2,
      name: '프로그래밍 기초',
    },
    {
      id: 3,
      name: '온라인 스터디',
    },
  ],
  files: [
    {
      id: 1,
      file_name: 'summary.md',
      file_url: 'https://example.com/uploads/files/recruitments/summary.md',
    },
    {
      id: 2,
      file_name: 'study-plan.pdf',
      file_url: 'https://example.com/uploads/files/recruitments/study-plan.pdf',
    },
    {
      id: 3,
      file_name: 'rules-and-guides.md',
      file_url:
        'https://example.com/uploads/files/recruitments/rules-and-guides.md',
    },
  ],
  // mockApplicationsList / mockAccountLists 데이터와 연결
  applications: [
    {
      id: 1,
      applicant: {
        id: 1,
        nickname: 'hong1', // user1@example.com
        email: 'user1@example.com',
      },
      status: 'PENDING',
      created_at: '2025-11-20T09:00:00+09:00',
    },
    {
      id: 2,
      applicant: {
        id: 2,
        nickname: 'young2', // user2@example.com
        email: 'user2@example.com',
      },
      status: 'ACCEPTED',
      created_at: '2025-11-20T09:10:00+09:00',
    },
    {
      id: 3,
      applicant: {
        id: 3,
        nickname: 'chul3', // user3@example.com
        email: 'user3@example.com',
      },
      status: 'REJECTED',
      created_at: '2025-11-20T09:20:00+09:00',
    },
  ],
}
export const mockRecruitmentDetailMap: Record<number, RecruitmentDetail> = {
  1: {
    id: 1,
    uuid: 'b8dbd77f-cf73-4ef4-9914-4394d5ab366e',
    title: 'Python 기초 온라인 스터디 모집',
    content: `
# 스터디 소개

파이썬을 처음부터 다시 정리하고 싶은 분들을 위한 온라인 스터디입니다.

## 이런 분과 함께해요

- 파이썬 문법을 처음부터 다시 복습하고 싶은 분
- 혼자 공부하다가 자꾸 흐지부지 끝났던 분
- 온라인으로 가볍게 시작해보고 싶은 분

## 진행 방식
 <img width="1161" height="806" alt="스크린샷 2025-12-03 오후 2 38 12" src="https://cdn.imweb.me/upload/S20210807d1f68b7a970c2/e7b94b0c106a8.jpg" />
 <img width="1161" height="806" alt="스크린샷 2025-12-03 오후 2 38 12" src="https://github.com/user-attachments/assets/2b85200f-63ed-4958-9de0-a51cc3da40fb" />

- 주 2회, 디스코드 음성 채널로 진행
- 인프런 [파이썬 입문] 강의를 기반으로 학습
- 매 스터디마다 과제 코드 리뷰 및 질의응답 진행
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/python-study.png',
    expected_headcount: 5,
    expected_payment_amount: 49000,
    close_at: '2025-12-01T23:59:59+09:00',
    is_closed: false,
    views_count: 1231,
    bookmark_count: 11,
    created_at: '2025-11-20T10:00:00+09:00',
    updated_at: '2025-11-20T10:05:00+09:00',
    lectures: [
      {
        id: 43001,
        title: '파이썬 입문',
        instructor: '김한영',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/python1.png',
        url_link: 'https://www.inflearn.com/course/python-intro',
      },
      {
        id: 43002,
        title: '파이썬 입문',
        instructor: '김한영',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/python1.png',
        url_link: 'https://www.inflearn.com/course/python-intro',
      },
      {
        id: 43003,
        title: '파이썬 입문',
        instructor: '김한영',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/python1.png',
        url_link: 'https://www.inflearn.com/course/python-intro',
      },
      {
        id: 43004,
        title: '파이썬 입문',
        instructor: '김한영',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/python1.png',
        url_link: 'https://www.inflearn.com/course/python-intro',
      },
      {
        id: 43005,
        title: '파이썬 입문',
        instructor: '김한영',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/python1.png',
        url_link: 'https://www.inflearn.com/course/python-intro',
      },
      {
        id: 43006,
        title: '파이썬 입문',
        instructor: '김한영',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/python1.png',
        url_link: 'https://www.inflearn.com/course/python-intro',
      },
      {
        id: 43007,
        title: '파이썬 입문',
        instructor: '김한영',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/python1.png',
        url_link: 'https://www.inflearn.com/course/python-intro',
      },
    ],
    tags: [
      { id: 1, name: 'python' },
      { id: 2, name: '프로그래밍 기초' },
      { id: 3, name: '온라인 스터디' },
      { id: 4, name: 'python' },
      { id: 5, name: '프로그래밍 기초' },
      { id: 6, name: '온라인 스터디' },
      { id: 7, name: 'python' },
      { id: 8, name: '프로그래밍 기초' },
      { id: 9, name: '온라인 스터디' },
      { id: 10, name: 'python' },
      { id: 11, name: '프로그래밍 기초' },
      { id: 12, name: '온라인 스터디' },
    ],
    files: [
      {
        id: 1,
        file_name: 'study-guide.md',
        file_url:
          'https://example.com/uploads/files/recruitments/1/study-guide.md',
      },
      {
        id: 2,
        file_name: 'schedule.pdf',
        file_url:
          'https://example.com/uploads/files/recruitments/1/schedule.pdf',
      },
      {
        id: 3,
        file_name: 'study-guide.md',
        file_url:
          'https://example.com/uploads/files/recruitments/1/study-guide.md',
      },
      {
        id: 4,
        file_name: 'schedule.pdf',
        file_url:
          'https://example.com/uploads/files/recruitments/1/schedule.pdf',
      },
      {
        id: 5,
        file_name: 'study-guide.md',
        file_url:
          'https://example.com/uploads/files/recruitments/1/study-guide.md',
      },
      {
        id: 6,
        file_name: 'schedule.pdf',
        file_url:
          'https://example.com/uploads/files/recruitments/1/schedule.pdf',
      },
    ],
    applications: [
      {
        id: 1,
        applicant: {
          id: 1,
          nickname: 'hong1',
          email: 'user1@example.com',
        },
        status: 'PENDING',
        created_at: '2025-11-20T11:00:00+09:00',
      },
      {
        id: 2,
        applicant: {
          id: 2,
          nickname: 'young2',
          email: 'user2@example.com',
        },
        status: 'ACCEPTED',
        created_at: '2025-11-20T11:05:00+09:00',
      },
      {
        id: 3,
        applicant: {
          id: 1,
          nickname: 'hong1',
          email: 'user1@example.com',
        },
        status: 'PENDING',
        created_at: '2025-11-20T11:00:00+09:00',
      },
      {
        id: 4,
        applicant: {
          id: 2,
          nickname: 'young2',
          email: 'user2@example.com',
        },
        status: 'ACCEPTED',
        created_at: '2025-11-20T11:05:00+09:00',
      },
      {
        id: 5,
        applicant: {
          id: 1,
          nickname: 'hong1',
          email: 'user1@example.com',
        },
        status: 'PENDING',
        created_at: '2025-11-20T11:00:00+09:00',
      },
      {
        id: 6,
        applicant: {
          id: 2,
          nickname: 'young2',
          email: 'user2@example.com',
        },
        status: 'ACCEPTED',
        created_at: '2025-11-20T11:05:00+09:00',
      },
    ],
  },

  2: {
    id: 2,
    uuid: 'f1c7b8c1-3c84-4c0e-91ab-111111111111',
    title: 'JavaScript 기초 + DOM 완전 정복 스터디',
    content: `
# 스터디 소개

웹 개발의 기본이 되는 자바스크립트 기초와 DOM 조작을 집중적으로 다룹니다.

## 커리큘럼

- 1주차: 변수, 함수, 스코프 이해
- 2주차: 배열, 객체, 고차 함수 맛보기
- 3주차: DOM 조작 기초 (querySelector, 이벤트 핸들링)
- 4주차: 간단한 To-do 리스트 프로젝트 완성

## 진행 방식

- 주 2회 구글 밋으로 진행
- 매 회차 과제 코드 PR 후 코드 리뷰

# 스터디 소개

웹 개발의 기본이 되는 자바스크립트 기초와 DOM 조작을 집중적으로 다룹니다.

## 커리큘럼

- 1주차: 변수, 함수, 스코프 이해
- 2주차: 배열, 객체, 고차 함수 맛보기
- 3주차: DOM 조작 기초 (querySelector, 이벤트 핸들링)
- 4주차: 간단한 To-do 리스트 프로젝트 완성

## 진행 방식

- 주 2회 구글 밋으로 진행
- 매 회차 과제 코드 PR 후 코드 리뷰

# 스터디 소개

웹 개발의 기본이 되는 자바스크립트 기초와 DOM 조작을 집중적으로 다룹니다.

## 커리큘럼

- 1주차: 변수, 함수, 스코프 이해
- 2주차: 배열, 객체, 고차 함수 맛보기
- 3주차: DOM 조작 기초 (querySelector, 이벤트 핸들링)
- 4주차: 간단한 To-do 리스트 프로젝트 완성

## 진행 방식

- 주 2회 구글 밋으로 진행
- 매 회차 과제 코드 PR 후 코드 리뷰

# 스터디 소개

웹 개발의 기본이 되는 자바스크립트 기초와 DOM 조작을 집중적으로 다룹니다.

## 커리큘럼

- 1주차: 변수, 함수, 스코프 이해
- 2주차: 배열, 객체, 고차 함수 맛보기
- 3주차: DOM 조작 기초 (querySelector, 이벤트 핸들링)
- 4주차: 간단한 To-do 리스트 프로젝트 완성

## 진행 방식

- 주 2회 구글 밋으로 진행
- 매 회차 과제 코드 PR 후 코드 리뷰

# 스터디 소개

웹 개발의 기본이 되는 자바스크립트 기초와 DOM 조작을 집중적으로 다룹니다.

## 커리큘럼

- 1주차: 변수, 함수, 스코프 이해
- 2주차: 배열, 객체, 고차 함수 맛보기
- 3주차: DOM 조작 기초 (querySelector, 이벤트 핸들링)
- 4주차: 간단한 To-do 리스트 프로젝트 완성

## 진행 방식

- 주 2회 구글 밋으로 진행
- 매 회차 과제 코드 PR 후 코드 리뷰

# 스터디 소개

웹 개발의 기본이 되는 자바스크립트 기초와 DOM 조작을 집중적으로 다룹니다.

## 커리큘럼

- 1주차: 변수, 함수, 스코프 이해
- 2주차: 배열, 객체, 고차 함수 맛보기
- 3주차: DOM 조작 기초 (querySelector, 이벤트 핸들링)
- 4주차: 간단한 To-do 리스트 프로젝트 완성

## 진행 방식

- 주 2회 구글 밋으로 진행
- 매 회차 과제 코드 PR 후 코드 리뷰

# 스터디 소개

웹 개발의 기본이 되는 자바스크립트 기초와 DOM 조작을 집중적으로 다룹니다.

## 커리큘럼

- 1주차: 변수, 함수, 스코프 이해
- 2주차: 배열, 객체, 고차 함수 맛보기
- 3주차: DOM 조작 기초 (querySelector, 이벤트 핸들링)
- 4주차: 간단한 To-do 리스트 프로젝트 완성

## 진행 방식

- 주 2회 구글 밋으로 진행
- 매 회차 과제 코드 PR 후 코드 리뷰
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/js-dom.png',
    expected_headcount: 6,
    expected_payment_amount: 39000,
    close_at: '2025-12-03T23:59:59+09:00',
    is_closed: false,
    views_count: 980,
    bookmark_count: 25,
    created_at: '2025-11-20T10:10:00+09:00',
    updated_at: '2025-11-20T10:15:00+09:00',
    lectures: [],
    tags: [],
    files: [],
    applications: [],
  },

  3: {
    id: 3,
    uuid: 'f1c7b8c1-3c84-4c0e-91ab-222222222222',
    title: '타입스크립트 입문 + 타입 시스템 이해 스터디',
    content: `
# 스터디 소개

자바스크립트에 타입을 더해주는 타입스크립트를 처음부터 차근차근 학습합니다.

## 이런 분을 환영해요

- any만 쓰고 있는 나 자신을 바꾸고 싶은 분
- 리액트 프로젝에 TS를 도입해보고 싶은 분
- 타입 설계 감각을 키우고 싶은 분

## 진행 방식

- 주 1회 온라인 라이브 + 주 1회 비동기 과제
- 공식 핸드북과 인프런 강의를 병행하여 학습
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/ts-intro.png',
    expected_headcount: 8,
    expected_payment_amount: 59000,
    close_at: '2025-12-05T23:59:59+09:00',
    is_closed: false,
    views_count: 754,
    bookmark_count: 31,
    created_at: '2025-11-20T10:20:00+09:00',
    updated_at: '2025-11-20T10:25:00+09:00',
    lectures: [
      {
        id: 43004,
        title: '타입스크립트 입문',
        instructor: '이타입',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/typescript.png',
        url_link: 'https://www.inflearn.com/course/typescript-intro',
      },
    ],
    tags: [
      { id: 7, name: '타입스크립트' },
      { id: 5, name: '웹 프론트엔드' },
      { id: 12, name: '취업 준비' },
    ],
    files: [
      {
        id: 4,
        file_name: 'ts-checklist.md',
        file_url:
          'https://example.com/uploads/files/recruitments/3/ts-checklist.md',
      },
    ],
    applications: [
      {
        id: 5,
        applicant: {
          id: 5,
          nickname: 'suji5',
          email: 'user5@example.com',
        },
        status: 'ACCEPTED',
        created_at: '2025-11-20T11:40:00+09:00',
      },
      {
        id: 6,
        applicant: {
          id: 6,
          nickname: 'woo6',
          email: 'user6@example.com',
        },
        status: 'PENDING',
        created_at: '2025-11-20T11:43:00+09:00',
      },
    ],
  },

  4: {
    id: 4,
    uuid: 'f1c7b8c1-3c84-4c0e-91ab-333333333333',
    title: 'React 훅스 기초와 상태 관리 스터디',
    content: `
# 스터디 소개

리액트 훅스(useState, useEffect 등)를 제대로 이해하고 싶은 분들을 위한 스터디입니다.

## 주요 학습 포인트

- 함수형 컴포넌트와 훅스의 개념
- 비동기 데이터 패칭 패턴 정리
- 커스텀 훅 설계 연습

## 진행 방식

- 주 2회 온라인 실시간 코드 실습
- 간단한 미니 프로젝트를 함께 만들며 적용
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/react-hooks.png',
    expected_headcount: 6,
    expected_payment_amount: 69000,
    close_at: '2025-12-02T23:59:59+09:00',
    is_closed: false,
    views_count: 520,
    bookmark_count: 18,
    created_at: '2025-11-20T10:25:00+09:00',
    updated_at: '2025-11-20T10:30:00+09:00',
    lectures: [
      {
        id: 43003,
        title: 'React 완전정복',
        instructor: '홍길동',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/react.png',
        url_link: 'https://www.inflearn.com/course/react-master',
      },
    ],
    tags: [
      { id: 5, name: '웹 프론트엔드' },
      { id: 6, name: '자바스크립트' },
      { id: 12, name: '취업 준비' },
    ],
    files: [
      {
        id: 5,
        file_name: 'hooks-outline.md',
        file_url:
          'https://example.com/uploads/files/recruitments/4/hooks-outline.md',
      },
    ],
    applications: [
      {
        id: 7,
        applicant: {
          id: 7,
          nickname: 'jimin7',
          email: 'user7@example.com',
        },
        status: 'PENDING',
        created_at: '2025-11-20T11:50:00+09:00',
      },
    ],
  },

  5: {
    id: 5,
    uuid: 'f1c7b8c1-3c84-4c0e-91ab-444444444444',
    title: 'Next.js 기반 포트폴리오 사이트 만들기',
    content: `
# 스터디 소개

Next.js를 사용해서 자신의 포트폴리오 사이트를 끝까지 완성해보는 스터디입니다.

## 목표

- 라우팅, 데이터 패칭, 이미지 최적화 경험
- 실제 배포까지 진행하여 링크로 공유 가능한 결과물 만들기
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/next-portfolio.png',
    expected_headcount: 8,
    expected_payment_amount: 79000,
    close_at: '2025-12-07T23:59:59+09:00',
    is_closed: false,
    views_count: 812,
    bookmark_count: 34,
    created_at: '2025-11-20T10:30:00+09:00',
    updated_at: '2025-11-20T10:35:00+09:00',
    lectures: [
      {
        id: 43005,
        title: 'Next.js 완전 정복',
        instructor: '박넥스트',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/next.png',
        url_link: 'https://www.inflearn.com/course/nextjs-full',
      },
    ],
    tags: [
      { id: 5, name: '웹 프론트엔드' },
      { id: 7, name: '타입스크립트' },
      { id: 12, name: '취업 준비' },
    ],
    files: [
      {
        id: 6,
        file_name: 'portfolio-wireframe.pdf',
        file_url:
          'https://example.com/uploads/files/recruitments/5/portfolio-wireframe.pdf',
      },
    ],
    applications: [
      {
        id: 8,
        applicant: {
          id: 8,
          nickname: 'sehun8',
          email: 'user8@example.com',
        },
        status: 'ACCEPTED',
        created_at: '2025-11-20T12:00:00+09:00',
      },
      {
        id: 9,
        applicant: {
          id: 9,
          nickname: 'nari9',
          email: 'user9@example.com',
        },
        status: 'CANCELED',
        created_at: '2025-11-20T12:10:00+09:00',
      },
    ],
  },

  6: {
    id: 6,
    uuid: 'f1c7b8c1-3c84-4c0e-91ab-555555555555',
    title: '알고리즘 기초 + 코딩 테스트 준비 스터디',
    content: `
# 스터디 소개

코딩 테스트를 처음 준비하는 분들을 위한 알고리즘 기초 스터디입니다.

- 배열, 문자열, 해시, 스택/큐 등 기본 유형 위주
- 매주 백준/프로그래머스 문제 함께 풀이
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/algorithm-basic.png',
    expected_headcount: 10,
    expected_payment_amount: 0,
    close_at: '2025-11-30T23:59:59+09:00',
    is_closed: true,
    views_count: 1120,
    bookmark_count: 45,
    created_at: '2025-11-20T10:35:00+09:00',
    updated_at: '2025-11-20T10:40:00+09:00',
    lectures: [],
    tags: [
      { id: 4, name: '알고리즘' },
      { id: 11, name: '알고리즘 테스트 대비' },
      { id: 13, name: '코딩 테스트' },
    ],
    files: [],
    applications: [
      {
        id: 10,
        applicant: {
          id: 10,
          nickname: 'doyun10',
          email: 'user10@example.com',
        },
        status: 'PENDING',
        created_at: '2025-11-20T12:20:00+09:00',
      },
    ],
  },

  7: {
    id: 7,
    uuid: 'f1c7b8c1-3c84-4c0e-91ab-666666666666',
    title: '데이터 분석을 위한 Python & Pandas 스터디',
    content: `
# 스터디 소개

데이터 분석 입문자를 위한 파이썬 데이터 분석 스터디입니다.

- Pandas, Matplotlib, 기초 EDA 진행
- 간단한 데이터셋을 가지고 프로젝트 진행
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/python-data.png',
    expected_headcount: 7,
    expected_payment_amount: 69000,
    close_at: '2025-12-04T23:59:59+09:00',
    is_closed: false,
    views_count: 630,
    bookmark_count: 22,
    created_at: '2025-11-20T10:40:00+09:00',
    updated_at: '2025-11-20T10:45:00+09:00',
    lectures: [
      {
        id: 43006,
        title: '데이터 분석을 위한 파이썬',
        instructor: '데이터박',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/python-data.png',
        url_link: 'https://www.inflearn.com/course/python-data-analysis',
      },
    ],
    tags: [
      { id: 1, name: 'python' },
      { id: 14, name: '데이터 분석' },
    ],
    files: [],
    applications: [
      {
        id: 11,
        applicant: {
          id: 11,
          nickname: 'jiho11',
          email: 'user11@example.com',
        },
        status: 'ACCEPTED',
        created_at: '2025-11-20T12:30:00+09:00',
      },
    ],
  },

  8: {
    id: 8,
    uuid: 'f1c7b8c1-3c84-4c0e-91ab-777777777777',
    title: 'CS 기초 개념 함께 정리하는 스터디',
    content: `
# 스터디 소개

운영체제, 네트워크, 자료구조 등 CS 기초를 함께 정리하는 스터디입니다.

- 주제별로 나눠 발표 & 질의응답
- 취준 면접 대비 위주로 정리
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/cs-basic.png',
    expected_headcount: 6,
    expected_payment_amount: 0,
    close_at: '2025-12-10T23:59:59+09:00',
    is_closed: false,
    views_count: 410,
    bookmark_count: 19,
    created_at: '2025-11-20T10:45:00+09:00',
    updated_at: '2025-11-20T10:50:00+09:00',
    lectures: [],
    tags: [
      { id: 9, name: '자료구조' },
      { id: 10, name: 'CS기초' },
      { id: 12, name: '취업 준비' },
    ],
    files: [],
    applications: [
      {
        id: 12,
        applicant: {
          id: 12,
          nickname: 'daeun12',
          email: 'user12@example.com',
        },
        status: 'PENDING',
        created_at: '2025-11-20T12:40:00+09:00',
      },
    ],
  },

  9: {
    id: 9,
    uuid: 'f1c7b8c1-3c84-4c0e-91ab-888888888888',
    title: '온라인 프로젝트 협업 스터디 (깃 & 이슈 트래킹)',
    content: `
# 스터디 소개

실제 팀 프로젝트처럼 Git 브랜치 전략, 이슈 트래킹, PR 리뷰를 경험해보는 스터디입니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/git-collab.png',
    expected_headcount: 6,
    expected_payment_amount: 0,
    close_at: '2025-11-28T23:59:59+09:00',
    is_closed: true,
    views_count: 950,
    bookmark_count: 40,
    created_at: '2025-11-10T10:00:00+09:00',
    updated_at: '2025-11-18T10:00:00+09:00',
    lectures: [],
    tags: [
      { id: 5, name: '웹 프론트엔드' },
      { id: 12, name: '취업 준비' },
    ],
    files: [],
    applications: [
      {
        id: 13,
        applicant: {
          id: 13,
          nickname: 'hae13',
          email: 'user13@example.com',
        },
        status: 'ACCEPTED',
        created_at: '2025-11-15T09:00:00+09:00',
      },
      {
        id: 14,
        applicant: {
          id: 14,
          nickname: 'bora14',
          email: 'user14@example.com',
        },
        status: 'ACCEPTED',
        created_at: '2025-11-15T09:10:00+09:00',
      },
    ],
  },

  10: {
    id: 10,
    uuid: 'f1c7b8c1-3c84-4c0e-91ab-999999999999',
    title: '프론트엔드 면접 스터디 (자기소개 + 기술 질문)',
    content: `
# 스터디 소개

프론트엔드 취준생을 위한 면접 대비 스터디입니다.

- 1분 자기소개, 프로젝트 설명 연습
- 예상 질문 리스트를 기반으로 모의 면접 진행
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/fe-interview.png',
    expected_headcount: 5,
    expected_payment_amount: 0,
    close_at: '2025-11-27T23:59:59+09:00',
    is_closed: true,
    views_count: 1340,
    bookmark_count: 57,
    created_at: '2025-11-05T10:00:00+09:00',
    updated_at: '2025-11-19T10:00:00+09:00',
    lectures: [],
    tags: [{ id: 12, name: '취업 준비' }],
    files: [],
    applications: [
      {
        id: 15,
        applicant: {
          id: 15,
          nickname: 'tae15',
          email: 'user15@example.com',
        },
        status: 'ACCEPTED',
        created_at: '2025-11-10T10:00:00+09:00',
      },
    ],
  },

  11: {
    id: 11,
    uuid: '11111111-1111-1111-1111-aaaaaaaaaaaa',
    title: 'Python 심화: 객체지향과 테스트 코드 스터디',
    content: `
# 스터디 소개

파이썬으로 객체지향 설계와 테스트 코드를 연습하는 심화 스터디입니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/python-oop.png',
    expected_headcount: 5,
    expected_payment_amount: 89000,
    close_at: '2025-12-08T23:59:59+09:00',
    is_closed: false,
    views_count: 320,
    bookmark_count: 15,
    created_at: '2025-11-20T10:55:00+09:00',
    updated_at: '2025-11-20T11:00:00+09:00',
    lectures: [],
    tags: [
      { id: 1, name: 'python' },
      { id: 2, name: '프로그래밍 기초' },
    ],
    files: [],
    applications: [],
  },

  12: {
    id: 12,
    uuid: '22222222-2222-2222-2222-bbbbbbbbbbbb',
    title: '웹 접근성 기초 같이 공부하는 스터디',
    content: `
# 스터디 소개

웹 접근성의 기본 원칙과 실무에서 적용하는 방법을 함께 공부하는 스터디입니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/web-a11y.png',
    expected_headcount: 4,
    expected_payment_amount: 0,
    close_at: '2025-12-12T23:59:59+09:00',
    is_closed: false,
    views_count: 210,
    bookmark_count: 9,
    created_at: '2025-11-20T11:00:00+09:00',
    updated_at: '2025-11-20T11:05:00+09:00',
    lectures: [],
    tags: [{ id: 5, name: '웹 프론트엔드' }],
    files: [],
    applications: [],
  },

  13: {
    id: 13,
    uuid: '33333333-3333-3333-3333-cccccccccccc',
    title: 'UDEMY 강의 같이 듣는 React 스터디',
    content: `
# 스터디 소개

유데미 리액트 강의를 함께 수강하며 실습 위주로 정리하는 스터디입니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/react-udemy.png',
    expected_headcount: 10,
    expected_payment_amount: 39000,
    close_at: '2025-12-06T23:59:59+09:00',
    is_closed: false,
    views_count: 450,
    bookmark_count: 17,
    created_at: '2025-11-20T11:05:00+09:00',
    updated_at: '2025-11-20T11:10:00+09:00',
    lectures: [
      {
        id: 43020,
        title: 'UDEMY React 강의',
        instructor: 'Udemy Instructor',
        thumbnail_img_url:
          'https://example.com/images/lecture/thumbnails/react-udemy.png',
        url_link: 'https://www.udemy.com/course/react-complete-guide',
      },
    ],
    tags: [
      { id: 5, name: '웹 프론트엔드' },
      { id: 6, name: '자바스크립트' },
    ],
    files: [],
    applications: [],
  },

  14: {
    id: 14,
    uuid: '44444444-4444-4444-4444-dddddddddddd',
    title: 'HTML/CSS 레이아웃 클론 코딩 스터디',
    content: `
# 스터디 소개

반응형 레이아웃과 그리드, 플렉스박스를 중심으로 여러 랜딩 페이지를 클론 코딩합니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/html-css.png',
    expected_headcount: 8,
    expected_payment_amount: 29000,
    close_at: '2025-12-09T23:59:59+09:00',
    is_closed: false,
    views_count: 380,
    bookmark_count: 14,
    created_at: '2025-11-20T11:10:00+09:00',
    updated_at: '2025-11-20T11:15:00+09:00',
    lectures: [],
    tags: [
      { id: 5, name: '웹 프론트엔드' },
      { id: 2, name: '프로그래밍 기초' },
    ],
    files: [],
    applications: [],
  },

  15: {
    id: 15,
    uuid: '55555555-5555-5555-5555-eeeeeeeeeeee',
    title: 'GitHub Actions로 CI/CD 맛보기 스터디',
    content: `
# 스터디 소개

간단한 프론트엔드 프로젝트를 대상으로 GitHub Actions를 이용해 CI/CD 파이프라인을 구축해보는 스터디입니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/github-actions.png',
    expected_headcount: 5,
    expected_payment_amount: 0,
    close_at: '2025-12-11T23:59:59+09:00',
    is_closed: false,
    views_count: 260,
    bookmark_count: 12,
    created_at: '2025-11-20T11:15:00+09:00',
    updated_at: '2025-11-20T11:20:00+09:00',
    lectures: [],
    tags: [{ id: 12, name: '취업 준비' }],
    files: [],
    applications: [],
  },

  16: {
    id: 16,
    uuid: '66666666-6666-6666-6666-ffffffffffff',
    title: 'REST API 이해와 Postman 실습 스터디',
    content: `
# 스터디 소개

REST API의 기본 개념과 HTTP 메서드, 응답 코드 등을 정리하고 Postman으로 직접 호출해보는 스터디입니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/rest-api.png',
    expected_headcount: 6,
    expected_payment_amount: 0,
    close_at: '2025-12-13T23:59:59+09:00',
    is_closed: false,
    views_count: 230,
    bookmark_count: 10,
    created_at: '2025-11-20T11:20:00+09:00',
    updated_at: '2025-11-20T11:25:00+09:00',
    lectures: [],
    tags: [{ id: 8, name: '백엔드' }],
    files: [],
    applications: [],
  },

  17: {
    id: 17,
    uuid: '77777777-7777-7777-7777-aaaaaaaaaaa1',
    title: '기초 알고리즘 + 파이썬 구현 스터디',
    content: `
# 스터디 소개

파이썬으로 기본 알고리즘 문제를 함께 풀어보는 스터디입니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/py-algo.png',
    expected_headcount: 7,
    expected_payment_amount: 0,
    close_at: '2025-12-02T23:59:59+09:00',
    is_closed: false,
    views_count: 310,
    bookmark_count: 13,
    created_at: '2025-11-20T11:25:00+09:00',
    updated_at: '2025-11-20T11:30:00+09:00',
    lectures: [],
    tags: [
      { id: 1, name: 'python' },
      { id: 4, name: '알고리즘' },
    ],
    files: [],
    applications: [],
  },

  18: {
    id: 18,
    uuid: '88888888-8888-8888-8888-bbbbbbbbbb11',
    title: '리액트 상태관리 맛보기 (Zustand, Redux 비교)',
    content: `
# 스터디 소개

리액트에서 많이 사용하는 상태관리 라이브러리들을 가볍게 비교해보는 스터디입니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/state-management.png',
    expected_headcount: 6,
    expected_payment_amount: 0,
    close_at: '2025-12-15T23:59:59+09:00',
    is_closed: false,
    views_count: 190,
    bookmark_count: 8,
    created_at: '2025-11-20T11:30:00+09:00',
    updated_at: '2025-11-20T11:35:00+09:00',
    lectures: [],
    tags: [{ id: 5, name: '웹 프론트엔드' }],
    files: [],
    applications: [],
  },

  19: {
    id: 19,
    uuid: '99999999-9999-9999-9999-cccccccccc11',
    title: '개인 블로그 만들기 (Next.js + Markdown)',
    content: `
# 스터디 소개

Next.js와 Markdown 기반으로 개인 기술 블로그를 만드는 스터디입니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/next-blog.png',
    expected_headcount: 5,
    expected_payment_amount: 59000,
    close_at: '2025-12-20T23:59:59+09:00',
    is_closed: false,
    views_count: 270,
    bookmark_count: 16,
    created_at: '2025-11-20T11:35:00+09:00',
    updated_at: '2025-11-20T11:40:00+09:00',
    lectures: [],
    tags: [
      { id: 5, name: '웹 프론트엔드' },
      { id: 7, name: '타입스크립트' },
    ],
    files: [],
    applications: [],
  },

  20: {
    id: 20,
    uuid: 'aaaaaaaa-aaaa-aaaa-aaaa-dddddddddd11',
    title: '스터디 운영자 모임 (운영 노하우 공유)',
    content: `
# 스터디 소개

이미 스터디를 운영 중이거나 운영을 준비하는 분들이 모여 노하우를 공유하는 모임입니다.
`,
    thumbnail_img_url:
      'https://example.com/uploads/recruitments/images/study-leader.png',
    expected_headcount: 10,
    expected_payment_amount: 0,
    close_at: '2025-12-22T23:59:59+09:00',
    is_closed: false,
    views_count: 150,
    bookmark_count: 6,
    created_at: '2025-11-20T11:40:00+09:00',
    updated_at: '2025-11-20T11:45:00+09:00',
    lectures: [],
    tags: [{ id: 3, name: '온라인 스터디' }],
    files: [],
    applications: [],
  },
}

// api/v1/admin/applications
// 모집공고 지원 내역 목록 조회
export const mockApplicationsList: ApplicationsList = {
  count: 23,
  next: 'http://api.ozcoding.site/api/v1/admin/applications?page=2&page_size=20',
  previous: null,
  results: [
    {
      id: 1,
      recruitment: { id: 1, title: 'python 스터디 모집 공고 1' },
      applicant: {
        id: 1,
        nickname: 'hong1',
        email: 'user1@example.com',
      },
      status: 'PENDING',
      created_at: '2025-11-20T09:00:00+09:00',
      updated_at: '2025-11-20T09:00:00+09:00',
    },
    {
      id: 2,
      recruitment: {
        id: 1,
        title: 'python 스터디 모집 공고 1',
      },
      applicant: {
        id: 2,
        nickname: 'young2',
        email: 'user2@example.com',
      },
      status: 'ACCEPTED',
      created_at: '2025-11-20T09:10:00+09:00',
      updated_at: '2025-11-20T09:10:00+09:00',
    },
    {
      id: 3,
      recruitment: {
        id: 2,
        title: 'python 스터디 모집 공고 2',
      },
      applicant: {
        id: 3,
        nickname: 'chul3',
        email: 'user3@example.com',
      },
      status: 'REJECTED',
      created_at: '2025-11-20T09:20:00+09:00',
      updated_at: '2025-11-20T09:20:00+09:00',
    },
    {
      id: 4,
      recruitment: {
        id: 2,
        title: 'python 스터디 모집 공고 2',
      },
      applicant: {
        id: 4,
        nickname: 'min4',
        email: 'user4@example.com',
      },
      status: 'PENDING',
      created_at: '2025-11-20T09:30:00+09:00',
      updated_at: '2025-11-20T09:30:00+09:00',
    },
    {
      id: 5,
      recruitment: {
        id: 3,
        title: 'python 스터디 모집 공고 3',
      },
      applicant: {
        id: 5,
        nickname: 'suji5',
        email: 'user5@example.com',
      },
      status: 'CANCELED',
      created_at: '2025-11-20T09:40:00+09:00',
      updated_at: '2025-11-20T09:40:00+09:00',
    },
    {
      id: 6,
      recruitment: {
        id: 3,
        title: 'python 스터디 모집 공고 3',
      },
      applicant: {
        id: 6,
        nickname: 'woo6',
        email: 'user6@example.com',
      },
      status: 'PENDING',
      created_at: '2025-11-20T09:50:00+09:00',
      updated_at: '2025-11-20T09:50:00+09:00',
    },
    {
      id: 7,
      recruitment: {
        id: 4,
        title: 'python 스터디 모집 공고 4',
      },
      applicant: {
        id: 7,
        nickname: 'jimin7',
        email: 'user7@example.com',
      },
      status: 'ACCEPTED',
      created_at: '2025-11-20T10:00:00+09:00',
      updated_at: '2025-11-20T10:00:00+09:00',
    },
    {
      id: 8,
      recruitment: {
        id: 4,
        title: 'python 스터디 모집 공고 4',
      },
      applicant: {
        id: 8,
        nickname: 'sehun8',
        email: 'user8@example.com',
      },
      status: 'PENDING',
      created_at: '2025-11-20T10:10:00+09:00',
      updated_at: '2025-11-20T10:10:00+09:00',
    },
    {
      id: 9,
      recruitment: {
        id: 5,
        title: 'python 스터디 모집 공고 5',
      },
      applicant: {
        id: 9,
        nickname: 'nari9',
        email: 'user9@example.com',
      },
      status: 'REJECTED',
      created_at: '2025-11-20T10:20:00+09:00',
      updated_at: '2025-11-20T10:20:00+09:00',
    },
    {
      id: 10,
      recruitment: {
        id: 5,
        title: 'python 스터디 모집 공고 5',
      },
      applicant: {
        id: 10,
        nickname: 'doyun10',
        email: 'user10@example.com',
      },
      status: 'PENDING',
      created_at: '2025-11-20T10:30:00+09:00',
      updated_at: '2025-11-20T10:30:00+09:00',
    },
    {
      id: 11,
      recruitment: {
        id: 6,
        title: 'python 스터디 모집 공고 6',
      },
      applicant: {
        id: 11,
        nickname: 'jiho11',
        email: 'user11@example.com',
      },
      status: 'ACCEPTED',
      created_at: '2025-11-20T10:40:00+09:00',
      updated_at: '2025-11-20T10:40:00+09:00',
    },
    {
      id: 12,
      recruitment: {
        id: 6,
        title: 'python 스터디 모집 공고 6',
      },
      applicant: {
        id: 12,
        nickname: 'daeun12',
        email: 'user12@example.com',
      },
      status: 'CANCELED',
      created_at: '2025-11-20T10:50:00+09:00',
      updated_at: '2025-11-20T10:50:00+09:00',
    },
    {
      id: 13,
      recruitment: {
        id: 7,
        title: 'python 스터디 모집 공고 7',
      },
      applicant: {
        id: 13,
        nickname: 'hae13',
        email: 'user13@example.com',
      },
      status: 'PENDING',
      created_at: '2025-11-20T11:00:00+09:00',
      updated_at: '2025-11-20T11:00:00+09:00',
    },
    {
      id: 14,
      recruitment: {
        id: 7,
        title: 'python 스터디 모집 공고 7',
      },
      applicant: {
        id: 14,
        nickname: 'bora14',
        email: 'user14@example.com',
      },
      status: 'ACCEPTED',
      created_at: '2025-11-20T11:10:00+09:00',
      updated_at: '2025-11-20T11:10:00+09:00',
    },
    {
      id: 15,
      recruitment: {
        id: 8,
        title: 'python 스터디 모집 공고 8',
      },
      applicant: {
        id: 15,
        nickname: 'tae15',
        email: 'user15@example.com',
      },
      status: 'PENDING',
      created_at: '2025-11-20T11:20:00+09:00',
      updated_at: '2025-11-20T11:20:00+09:00',
    },
    {
      id: 16,
      recruitment: {
        id: 8,
        title: 'python 스터디 모집 공고 8',
      },
      applicant: {
        id: 16,
        nickname: 'dasol16',
        email: 'user16@example.com',
      },
      status: 'REJECTED',
      created_at: '2025-11-20T11:30:00+09:00',
      updated_at: '2025-11-20T11:30:00+09:00',
    },
    {
      id: 17,
      recruitment: {
        id: 9,
        title: 'python 스터디 모집 공고 9',
      },
      applicant: {
        id: 17,
        nickname: 'jihoon17',
        email: 'user17@example.com',
      },
      status: 'PENDING',
      created_at: '2025-11-20T11:40:00+09:00',
      updated_at: '2025-11-20T11:40:00+09:00',
    },
    {
      id: 18,
      recruitment: {
        id: 9,
        title: 'python 스터디 모집 공고 9',
      },
      applicant: {
        id: 18,
        nickname: 'soyeon18',
        email: 'user18@example.com',
      },
      status: 'ACCEPTED',
      created_at: '2025-11-20T11:50:00+09:00',
      updated_at: '2025-11-20T11:50:00+09:00',
    },
    {
      id: 19,
      recruitment: {
        id: 10,
        title: 'python 스터디 모집 공고 10',
      },
      applicant: {
        id: 19,
        nickname: 'gaeun19',
        email: 'user19@example.com',
      },
      status: 'PENDING',
      created_at: '2025-11-20T12:00:00+09:00',
      updated_at: '2025-11-20T12:00:00+09:00',
    },
    {
      id: 20,
      recruitment: {
        id: 10,
        title: 'python 스터디 모집 공고 10',
      },
      applicant: {
        id: 20,
        nickname: 'haneul20',
        email: 'user20@example.com',
      },
      status: 'CANCELED',
      created_at: '2025-11-20T12:10:00+09:00',
      updated_at: '2025-11-20T12:10:00+09:00',
    },
  ],
}

// api/v1/admin/applications/{application_id}
// 지원 내역 상세 조회
export const mockApplicationsDetail: ApplicationsDetail = {
  id: 1,
  self_introduction: '나는 홍길동입니다.',
  motivation: '파이썬 독학으로 마스터해보고 싶어요.',
  objective: '파이썬 라이브러리 컨트리뷰터가 되고싶어요.',
  available_time: '10:00 ~ 11:00',
  has_study_experience: true,
  study_experience: 'DBA 자격증 스터디 경험 있습니다.',
  status: 'PENDING',
  recruitment: {
    // mockRecruitmentDetail / mockRecruitmentList의 첫 번째 공고와 연결
    id: 1,
    title: 'python 스터디 모집 공고 1',
    expected_headcount: 5,
    close_at: '2025-11-20T00:00:05.875842+09:00',
    // mockLectureList에 있는 강의들 기반으로 여러 개 연결
    lectures: [
      {
        id: 43001,
        title: '파이썬 입문',
        instructor: '김한영',
      },
      {
        id: 43003,
        title: 'React 완전정복',
        instructor: '홍길동',
      },
      {
        id: 43012,
        title: '3시간 완성 n8n',
        instructor: 'SOLVIT team',
      },
    ],
    // 기존 태그 + 몇 개 확장
    tags: [
      {
        id: 1,
        name: 'python',
      },
      {
        id: 2,
        name: '프로그래밍 기초',
      },
      {
        id: 3,
        name: '온라인 스터디',
      },
    ],
  },
  applicant: {
    // mockAccountDetail / mockAccountLists의 1번 유저와 연결
    id: 1,
    nickname: 'hong1',
    email: 'user1@example.com',
    profile_img_url: 'https://example.com/images/profiles/user1.png',
  },
  created_at: '2025-11-20T00:00:05.875842+09:00',
  updated_at: '2025-11-20T00:00:05.875845+09:00',
}
