import { fruit, twod } from "./types";

const getNorm = (v: twod) => {
  return Math.sqrt(v.x * v.x + v.y * v.y);
};
const getVectorCal = (v1: twod, v2: twod, cal: string): twod => {
  if (cal === "-") {
    return {
      x: v1.x - v2.x,
      y: v1.y - v2.y,
    };
  } else if (cal === "+") {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y,
    };
  } else return v1;
};

const getCosTheta = (v1: twod, v2: twod) => {
  const innerProduct = v1.x * v2.x + v1.y * v2.y;
  return innerProduct / getNorm(v1) / getNorm(v2);
};

const nearby = (fruit1: fruit, fruit2: fruit) => {
  return getNorm(getVectorCal(fruit1.pos, fruit2.pos, "-")) < fruit1.radius + fruit2.radius;
};
export const circleCollision = (
  fruit1: fruit,
  fruit2: fruit
): {
  fruit1: fruit;
  fruit2: fruit;
} => {
  if (!nearby(fruit1, fruit2)) {
    return {
      fruit1: fruit1,
      fruit2: fruit2,
    };
  } else {
    const fruit12 = getVectorCal(fruit1.pos, fruit2.pos, "-");
    const fruit21 = getVectorCal(fruit2.pos, fruit1.pos, "-");

    const cosTheta1 = getCosTheta(fruit12, fruit2.velocity);
    const cosTheta2 = getCosTheta(fruit21, fruit1.velocity);

    const v1 = getNorm(fruit1.velocity);
    const v2 = getNorm(fruit2.velocity);
    const m1 = fruit1.radius * fruit1.radius;
    const m2 = fruit2.radius * fruit2.radius;

    const dist = fruit1.radius + fruit2.radius;

    const collisionRate = 1;

    const newVelo1 = {
      x: ((m1 / (m1 + m2)) * fruit1.velocity.x + (m2 / (m1 + m2)) * fruit12.x) * collisionRate,
      y: ((m1 / (m1 + m2)) * fruit1.velocity.y + (m2 / (m1 + m2)) * fruit12.y) * collisionRate,
    };
    const newVelo2 = {
      x: ((m2 / (m1 + m2)) * fruit2.velocity.x + (m1 / (m1 + m2)) * fruit21.x) * collisionRate,
      y: ((m2 / (m1 + m2)) * fruit2.velocity.y + (m1 / (m1 + m2)) * fruit21.y) * collisionRate,
    };
    return {
      fruit1: {
        ...fruit1,
        velocity: newVelo1,
      },
      fruit2: {
        ...fruit2,
        velocity: newVelo2,
      },
    };
  }
};
