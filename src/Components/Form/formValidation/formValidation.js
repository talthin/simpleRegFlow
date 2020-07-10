export const required = value => (value || typeof value === 'number' ? undefined : 'Required field');
export const email = value =>
  value && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)
    ? 'Invalid e-mail'
    : undefined;
export const swePhoneNumber = value => swePhoneNumberCheck(value) ? undefined : "Please enter a swedish mobile number";
export const swePhoneNumberCheck = value => {

  if (isNaN(value)) {
    return false;
  }

  if (value.length === 11 || value.length > 14 || value.length < 9) {
    return false;
  }

  if (value.length === 14) {
    if ((Number(value[0]) === 0) && (Number(value[1]) === 0)
      && (Number(value[2]) === 4) && (Number(value[3]) === 6)
      && (Number(value[4]) === 0) && (Number(value[5]) === 7)
      && ((Number(value[6]) === 0) || (Number(value[6]) === 2) || (Number(value[6]) === 3) || (Number(value[6]) === 3) || (Number(value[6]) === 6))) {
      return true;
    } else {
      return false;
    }
  }

  if (value.length === 13) {
    if ((Number(value[0]) === 0) && (Number(value[1]) === 0)
      && (Number(value[2]) === 4) && (Number(value[3]) === 6)
      && (Number(value[4]) === 7) && ((Number(value[5]) === 0) || (Number(value[5]) === 2) || (Number(value[5]) === 3) || (Number(value[5]) === 3) || (Number(value[5]) === 6))) {
      return true;
    } else if ((value[0] === "+") && (Number(value[1]) === 4)
      && (Number(value[2]) === 6) && (Number(value[3]) === 0)
      && (Number(value[4]) === 7) && ((Number(value[5]) === 0) || (Number(value[5]) === 2) || (Number(value[5]) === 3) || (Number(value[5]) === 3) || (Number(value[5]) === 6))) {
      return true
    } else {
      return false;
    }
  }

  if (value.length === 12) {
    if ((value[0] === "+") && (Number(value[1]) === 4)
      && (Number(value[2]) === 6) && (Number(value[3]) === 7)
      && ((Number(value[4]) === 0) || (Number(value[4]) === 2) || (Number(value[4]) === 3) || (Number(value[4]) === 3) || (Number(value[4]) === 6))) {
      return true;
    } else {
      return false;
    }
  }

  if (value.length === 10) {
    if ((Number(value[0]) === 0) && (Number(value[1]) === 7)
      && ((Number(value[2]) === 0) || (Number(value[2]) === 2) || (Number(value[2]) === 3) || (Number(value[2]) === 3) || (Number(value[2]) === 6))) {
      return true;
    } else {
      return false;
    }
  }

  if (value.length === 9) {
    if ((Number(value[0]) === 7) && ((Number(value[1]) === 0)
     || (Number(value[1]) === 0) || (Number(value[1]) === 2) || (Number(value[1]) === 3) || (Number(value[1]) === 3) || (Number(value[1]) === 6))) {
      return true;
    } else {
      return false;
    }
  }
}
export const socialSecurityNumber = ssn => !socialSecurityNumberCheck(ssn) ? 'Please write on format YYYYMMDDNNNN' : undefined;
export const socialSecurityNumberCheck = ssn => {

  ssn = ssn.replace(/\s|-/g, "")        // strip out all but digits

  if (ssn.length !== 12) {
    return false;
  }
  ssn = ssn
    .split("")              // convert string to array
    .reverse()              // reverse order for Luhn-algorithm
    .slice(0, 10);          // keep only 10 digits (i.e. 1977 becomes 77)

  // if (ssn.length !== 10) {
  //   return false;
  // }

  var sum = ssn
    // convert to number
    .map(function (n) {
      return Number(n);
    })
    // perform arithmetic and return sum
    .reduce(function (previous, current, index) {
      // multiply every other number with two
      if (index % 2) current *= 2;
      // if larger than 10 get sum of individual digits (also n-9)
      if (current > 9) current -= 9;
      // sum it up
      return previous + current;
    });

  // sum must be divisible by 10
  return 0 === sum % 10;
};

