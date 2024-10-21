import { describe, jest, expect } from '@jest/globals';
import {
  getUser,
  userSliceReducer,
  registerUser,
  updateUser,
  logoutUser,
  loginUser,
  initialState as testUserState,
  TUserSlice
} from './user-slice';

jest.mock('../../utils/burger-api', () => ({
  getUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn(),
  loginUserApi: jest.fn()
}));

const mockUser: TUserSlice = {
  isAuthorization: true,
  isAuthentication: true,
  user: {
    name: 'test',
    email: 'test@mail.ru'
  },
  error: undefined,
  isLoading: false
};

describe('Тест получения пользователя', () => {
  it('Отправка запроса на получение пользователя', () => {
    const expectedState = {
      ...testUserState,
      isLoading: true
    };

    const result = userSliceReducer(testUserState, {
      type: getUser.pending.type
    });
    expect(result).toEqual(expectedState);
  });

  it('Запрос на получение пользователя успешный', () => {
    const expectedState = {
      isAuthorization: true,
      isAuthentication: true,
      user: mockUser.user,
      error: undefined,
      isLoading: false
    };
    const testGetUser = {
      type: getUser.fulfilled.type,
      payload: mockUser
    };

    const result = userSliceReducer(testUserState, testGetUser);
    expect(result).toEqual(expectedState);
  });

  it('Запрос на получение пользователя с ошибкой', () => {
    const errorMessage = 'Ошибка при загрузке данных';

    const testGetUser = {
      type: getUser.rejected.type,
      error: { message: errorMessage }
    };

    const expectedState = {
      ...testUserState,
      isLoading: false,
      isAuthentication: true,
      error: errorMessage
    };

    const result = userSliceReducer(testUserState, testGetUser);
    expect(result).toEqual(expectedState);
  });
});

describe('Тест регистрации пользователя', () => {
  it('Запрос на регистрацию пользователя', () => {
    const expectedState = {
      ...testUserState,
      isLoading: true
    };

    const result = userSliceReducer(testUserState, {
      type: registerUser.pending.type
    });
    expect(result).toEqual(expectedState);
  });

  it('Успешная регистрация пользователя', () => {
    const expectedState = {
      isAuthorization: true,
      isAuthentication: true,
      user: mockUser.user,
      error: undefined,
      isLoading: false
    };
    const testRegisterUser = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };

    const result = userSliceReducer(testUserState, testRegisterUser);
    expect(result).toEqual(expectedState);
  });

  it('Ошибка регистрации', () => {
    const errorMessage = 'Ошибка при загрузке данных';

    const expectedState = {
      ...testUserState,
      error: errorMessage,
      isLoading: false
    };

    const testRegistertUser = {
      type: registerUser.rejected.type,
      error: { message: errorMessage }
    };

    const result = userSliceReducer(testUserState, testRegistertUser);
    expect(result).toEqual(expectedState);
  });
});

describe('Тест авторизации пользователя', () => {
  it('Запрос на авторизацию пользователя', () => {
    const expectedState = {
      ...testUserState,
      isAuthorization: false,
      isAuthentication: false,
      isLoading: true
    };

    const result = userSliceReducer(testUserState, {
      type: loginUser.pending.type
    });
    expect(result).toEqual(expectedState);
  });

  it('Успешная авторизация пользователя', () => {
    const expectedState = {
      isAuthorization: true,
      isAuthentication: true,
      user: mockUser.user,
      error: undefined,
      isLoading: false
    };
    const testLoginUser = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };

    const result = userSliceReducer(testUserState, testLoginUser);
    expect(result).toEqual(expectedState);
  });

  it('Запрос на авторизацию падает с ошибкой', () => {
    const errorMessage = 'Ошибка при загрузке данных';

    const expectedState = {
      ...testUserState,
      error: errorMessage,
      isLoading: false
    };

    const testLoginUser = {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    };

    const result = userSliceReducer(testUserState, testLoginUser);
    expect(result).toEqual(expectedState);
  });
});

describe('Тест логаута пользователя', () => {
  it('Запрос на логаут пользователя', () => {
    const expectedState = {
      ...testUserState,
      isLoading: true
    };

    const result = userSliceReducer(testUserState, {
      type: logoutUser.pending.type
    });
    expect(result).toEqual(expectedState);
  });

  it('Запрос на логаут успешный', () => {
    const expectedState = {
      ...testUserState,
      isLoading: false,
      isAuthentication: false,
      isAuthorization: false,
      user: {
        name: '',
        email: ''
      }
    };

    const result = userSliceReducer(testUserState, {
      type: logoutUser.fulfilled.type
    });
    expect(result).toEqual(expectedState);
  });

  it('Запрос на логаут пользователя падает с ошибкой', () => {
    const errorMessage = 'Ошибка при загрузке данных';

    const expectedState = {
      ...testUserState,
      error: errorMessage,
      isLoading: false
    };

    const testLogoutUser = {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    };

    const result = userSliceReducer(testUserState, testLogoutUser);
    expect(result).toEqual(expectedState);
  });
});

describe('Тест обновления пользователя', () => {
  it('Запрос на обновление пользователя', () => {
    const expectedState = {
      ...testUserState,
      isLoading: true
    };

    const result = userSliceReducer(testUserState, {
      type: updateUser.pending.type
    });
    expect(result).toEqual(expectedState);
  });

  it('Успешное обновление пользователя', () => {
    const expectedState = {
      ...testUserState,
      user: mockUser.user,
      error: undefined,
      isLoading: false
    };
    const testUpdateUser = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };

    const result = userSliceReducer(testUserState, testUpdateUser);
    expect(result).toEqual(expectedState);
  });

  it('Ошибка обновления пользователя', () => {
    const errorMessage = 'Ошибка при загрузке данных';

    const expectedState = {
      ...testUserState,
      error: errorMessage,
      isLoading: false
    };

    const testUpdateUser = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };

    const result = userSliceReducer(testUserState, testUpdateUser);
    expect(result).toEqual(expectedState);
  });
});
