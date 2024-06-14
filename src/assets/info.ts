const STATUS1_SIZE = 88;
const LEVEL1_STOP_TIME = 3000;
const LEVEL1_SPEED = 80;
export const BOGU_TYPE = 21;

export const category = {
  학업: 'study',
  직장: 'work',
  가족: 'family',
  친구: 'friend',
  연애: 'love',
  건강: 'health',
  사회문제: 'social',
  이유없음: 'noReason',
  기타: 'etc',
};

export const info = {
  status: {
    size: {
      1: STATUS1_SIZE,
      2: STATUS1_SIZE + 34 * 1,
      3: STATUS1_SIZE + 34 * 2,
      4: STATUS1_SIZE + 34 * 3,
      5: STATUS1_SIZE + 34 * 4,
      6: STATUS1_SIZE + 34 * 5,
      7: STATUS1_SIZE + 34 * 6,
      8: STATUS1_SIZE + 34 * 7,
      9: STATUS1_SIZE + 34 * 8,
    },
    touchSize: {
      1: 65,
      2: 90,
      3: 115,
      4: 145,
      5: 165,
      6: 190,
      7: 220,
      8: 240,
      9: 260,
    },
  },
  level: {
    stopTime: {
      1: LEVEL1_STOP_TIME,
      2: 0.9 * LEVEL1_STOP_TIME,
      3: 0.8 * LEVEL1_STOP_TIME,
      4: 0.6 * LEVEL1_STOP_TIME,
      5: 0.5 * LEVEL1_STOP_TIME,
      6: 0.1 * LEVEL1_STOP_TIME,
    },
    speed: {
      1: LEVEL1_SPEED,
      2: 1.2 * LEVEL1_SPEED,
      3: 1.4 * LEVEL1_SPEED,
      4: 1.7 * LEVEL1_SPEED,
      5: 2 * LEVEL1_SPEED,
      6: 2.5 * LEVEL1_SPEED,
    },
    vibrationTime: {},
  },

  category: {
    study: {
      1: {
        name: '등교 복어',
        playText: '멋을 위해 지느러미 관절을 포기한 관절통 멋쟁이 복어.',
      },
      2: {
        name: '열공 복어',
        playText:
          '연필을 아가미 위에 얹으면 공부를 하지 않아도 된다는 사실을 깨달은 잔머리 복어.',
      },
    },
    work: {
      1: {
        name: '한복어 과장',
        playText:
          '벌써 네 번째 결재를 받으러 가는 복어. 내용은 순서만 바꾸었다는 건 복어 팀장님껜 비밀.',
      },
      2: {
        name: '강복어 대리',
        playText:
          '갑각류 도시락이 든 서류 가방을 들고 출근하는 피곤한 복어. 성실하다!',
      },
      3: {
        name: '김복어 사원',
        playText:
          '출근 후 처음 햇빛을 보는 복어… 오후만 되면 줄지어 수면으로 나와 광합성을 하는 모습을 볼 수 있다.',
      },
    },
    family: {
      1: {
        name: '엄마 복어',
        playText:
          '엄마 복어의 공기 주머니엔, 공기와 맹독 대신 가족에 대한 사랑과 생활력으로 가득 차 있다.',
      },
      2: {
        name: '아들 복어',
        playText: '요새 운동을 다닌다고 자꾸 지느러미 근육을 만져보라고 한다.',
      },
      3: {
        name: '딸 복어',
        playText:
          '폰 보는 것을 많이 좋아하는 딸 복어. 주로 챌린지 영상이나 해파리 먹방 같은 걸 본다.',
      },
      4: {
        name: '아빠 복어',
        playText:
          '쉼 없이 바쁘게 일하는 책임감 있는 복어. 원동력은 지갑에 있는 가족 사진.',
      },
    },
    friend: {
      1: {
        name: '아싸 복어',
        playText: '뭐…! 존재감이 없어서 좋은 점도 있어!!\n\n…나랑 친구할래…?',
      },
      2: {
        name: '연극 복어',
        playText:
          '요즘 따라 ‘하고 싶은 말’과 ‘해야 하는 말’의 차이가 뭘까, 고민하고 있다. 속마음을 감춘 복어.',
      },
      3: {
        name: '혼밥 복어',
        playText:
          '같이 먹을 친구와 시간이 안 맞을 때도 있지만, 혼자가 편할 때도 있다는 복어. ',
      },
      // 4:{
      //     name:'마스크 복어',
      //     playText:''
      // },
    },
    love: {
      1: {
        name: '나홀로 복어',
        playText:
          '바다 속이지만 옆이 시린 그의 마음 속은 항상 사시사철 가을이다…',
      },
      2: {
        name: '커플 복어',
        playText:
          '마음 속에 다른 복어를 담은 복어.  그랬더니 하트가 자동으로 나온다고 주장한다(…)',
      },
    },
    health: {
      1: {
        name: '수액 복어',
        playText:
          '독기를 올려보겠다고 상한 꽃게를 먹었다가 입원했다. 덕분에 숨은 지병을 찾았다니 다행일지도.\n…얼른 낫자.',
      },
      2: {
        name: '부상 복어',
        playText:
          '보글보글 물방울이 올라오는 분화구에서 놀다가 암초에 부딪혔다. 전치 4주.',
      },
      3: {
        name: '다침 복어',
        playText:
          '화난 줄도 모르고 빵빵해진 친구 복어 가시에 긁혔다.  금방 나을거야!',
      },
    },
    social: {
      1: {
        name: '걱정 복어',
        playText:
          '세상에 관심이 많은 복어. 최근엔 대서양에 이어 인도양 신문도 구독했다. 요새 바다가 따듯해져서 고민이야.',
      },
    },
    noReason: {
      1: {
        name: '고뇌 복어',
        playText: '아무렇지 않아 보이게 하는 것이 누군가에겐 큰 일이에요.',
      },
      2: {
        name: '사색 복어',
        playText: '한번 시간을 갖고 스스로의 감정을 돌아보는 것은 어떨까요?',
      },
    },
    etc: {
      1: {
        name: '화난 복어',
        playText:
          '잔뜩 화나 무서워 보이지만 사실 아무에게나 함부로 쏟아내지는 않는 착한 복어다.',
      },
      2: {
        name: '눈물 복어',
        playText: '얼마나 슬펐으면 바다에 눈물이 보이겠어요…',
      },
    },
  },
};

export const idList = {
  '-1': {name: '', playText: ''},
  0: info.category.study[1],
  1: info.category.study[2],
  2: info.category.work[1],
  3: info.category.work[2],
  4: info.category.work[3],
  5: info.category.family[1],
  6: info.category.family[2],
  7: info.category.family[3],
  8: info.category.family[4],
  9: info.category.friend[1],
  10: info.category.friend[2],
  11: info.category.friend[3],
  12: info.category.love[1],
  13: info.category.love[2],
  14: info.category.health[1],
  15: info.category.health[2],
  16: info.category.health[3],
  17: info.category.social[1],
  18: info.category.noReason[1],
  19: info.category.noReason[2],
  20: info.category.etc[1],
  21: info.category.etc[2],
};
