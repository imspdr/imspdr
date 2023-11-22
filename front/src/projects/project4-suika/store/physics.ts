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
  fruit2: fruit | undefined;
} => {
  if (!nearby(fruit1, fruit2)) {
    return {
      fruit1: fruit1,
      fruit2: fruit2,
    };
  } else {
    if (fruit1.radius === fruit2.radius) {
      return {
        fruit1: {
          ...fruit1,
          pos: {
            x: (fruit1.pos.x + fruit2.pos.x) / 2,
            y: (fruit1.pos.y + fruit2.pos.y) / 2,
          },
          radius: fruit1.radius * 1.4,
          fillIndex: fruit1.fillIndex + 1,
        },
        fruit2: undefined,
      };
    }
    const fruit12 = getVectorCal(fruit1.pos, fruit2.pos, "-");
    const fruit21 = getVectorCal(fruit2.pos, fruit1.pos, "-");

    const nowSize = getNorm(fruit12);
    const v1 = getNorm(fruit1.velocity);
    const v2 = getNorm(fruit2.velocity);
    const m1 = fruit1.radius * fruit1.radius;
    const m2 = fruit2.radius * fruit2.radius;

    const dist = fruit1.radius + fruit2.radius;
    const sum = v1 + v2;

    const collisionRate = 0.9;

    const newVelo1 = {
      x:
        ((m1 / (m1 + m2)) * fruit1.velocity.x + (((m2 / (m1 + m2)) * fruit12.x) / dist) * sum) *
        collisionRate,
      y:
        ((m1 / (m1 + m2)) * fruit1.velocity.y + (((m2 / (m1 + m2)) * fruit12.y) / dist) * sum) *
        collisionRate,
    };
    const newVelo2 = {
      x:
        ((m2 / (m1 + m2)) * fruit2.velocity.x + (((m1 / (m1 + m2)) * fruit21.x) / dist) * sum) *
        collisionRate,
      y:
        ((m2 / (m1 + m2)) * fruit2.velocity.y + (((m1 / (m1 + m2)) * fruit21.y) / dist) * sum) *
        collisionRate,
    };
    return {
      fruit1: {
        ...fruit1,
        pos: {
          x: fruit2.pos.x + (fruit12.x / nowSize) * dist,
          y: fruit2.pos.y + (fruit12.y / nowSize) * dist,
        },
        velocity: newVelo1,
      },
      fruit2: {
        ...fruit2,
        velocity: newVelo2,
      },
    };
  }
};
