/**
 * @function - Random Token Generator
 * @param {number} length - number of characters
 * @return {string}
 */
export const randomToken = () => {
    let token = '';
    for (let i = 0; i < 8; i++) {
      token += Math.floor(Math.random() * 10);
    }
    return token;
  };
  