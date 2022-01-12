export class LocalDb {
  constructor() {
    this.sessionKey = 'anyDoneSession';
  }

  getSessions() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot !== null && itemGot !== 'undefined') {
      return JSON.parse(itemGot);
    }
    return null;
  }

  getUser() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot) {
      return JSON.parse(itemGot).user;
    }
    return null;
  }

  getTokensList() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot && JSON.parse(itemGot)) {
      return JSON.parse(itemGot).tokensList;
    }
    return null;
  }

  getServiceProvider() {
    if (this.getUser()) {
      return this.getUser().serviceProvider;
    }
  }

  isServiceProvider() {
    return this.getServiceProvider() !== undefined;
  }

  getEmployee() {
    if (this.getUser()) {
      return this.getUser().employee;
    }
  }
  isEmployee() {
    return this.getEmployee() !== undefined;
  }

  getAccountDetail() {
    if (this.isEmployee()) {
      return this.getEmployee().account;
    }
  }

  getUserAccountId() {
    if (this.isEmployee()) {
      return this.getEmployee().account.accountid;
    } else if (this.isServiceProvider()) {
      return this.getServiceProvider().account.accountid;
    }
  }
  getProfileId() {
    if (this.isEmployee()) {
      return this.getEmployee().employeeprofileid;
    } else if (this.isServiceProvider()) {
      return this.getServiceProvider().employeeprofileid;
    }
  }

  getPermission() {
    return this.isEmployee() !== undefined && this.getEmployee() !== undefined
      ? this.getEmployee().permissions
      : undefined;
  }

  setSession(session, callback) {
    try {
      localStorage.setItem(this.sessionKey, JSON.stringify(session), error =>
        callback(error),
      );
      callback(false);
    } catch (error) {
      console.log('Error while setting session.', error);
    }
  }

  removeSession(callback) {
    try {
      // localStorage.removeItem(this.sessionKey, error => callback(error));
      localStorage.clear();
    } catch (error) {
      console.log('Error while removing session.', error);
    }
  }

  saveInLocalDB(key, dataToSave, callback) {
    try {
      localStorage.setItem(key, JSON.stringify(dataToSave), error =>
        callback(error),
      );
      callback(false);
    } catch (error) {
      console.log('Error while setting session.', error);
    }
  }

  getSavedItemFromDB(key) {
    const itemGot = localStorage.getItem(key);
    if (itemGot !== null) {
      return JSON.parse(itemGot);
    }
    return null;
  }
}
export default new LocalDb();
