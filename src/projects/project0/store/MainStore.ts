import { makeAutoObservable } from "mobx";
import { badge } from "./types";

class MainStore {
  public badges: badge[];
  constructor() {
    this.badges = [
      {
        id: 1,
        pos: {
          x: 500,
          y: 200,
        },
        radius: 100,
        title: "Project1 - N퀸 문제",
        description:
          "P=NP 문제에 대한 간단한 요약과 다항 시간 내에 풀면 10억을 주는 NP complete 문제 중 하나인 n-퀸 문제를 구현",
        route: "chess",
        tag: ["짧은 글", "웹 게임", "상태 관리", "알고리즘 시각화"],
        icon: "queen",
      },
      {
        id: 2,
        pos: {
          x: 800,
          y: 200,
        },
        radius: 100,
        title: "Project2 - 정렬 시각화",
        description:
          "버블 정렬, 머지 정렬, 퀵 정렬, 팀 정렬을 javascript 코드로 구현하고 비동기 함수를 이용해 정렬 과정을 시각화",
        route: "sort",
        tag: ["상태 관리", "알고리즘 시각화"],
        icon: "sort",
      },
    ];
    makeAutoObservable(this);
  }

  setPos = (id: number, x: number, y: number, ids: number[]) => {
    const movingBadge = this.badges.find((badge: badge) => badge.id === id);
    if (!movingBadge) return;

    this.badges = this.badges.map((badge: badge) => {
      if (badge.id === id) {
        return {
          ...badge,
          pos: {
            x: x,
            y: y,
          },
        };
      } else {
        return badge;
      }
    });
    this.badges.forEach((badge: badge) => {
      if (badge.id !== id && !ids.includes(badge.id)) {
        const dist = Math.sqrt(
          (badge.pos.x - x) * (badge.pos.x - x) + (badge.pos.y - y) * (badge.pos.y - y)
        );
        if (dist < badge.radius + movingBadge.radius) {
          this.setPos(
            badge.id,
            badge.pos.x + ((badge.radius + movingBadge.radius - dist) * (badge.pos.x - x)) / dist,
            badge.pos.y + ((badge.radius + movingBadge.radius - dist) * (badge.pos.y - y)) / dist,
            [...ids, badge.id]
          );
        }
      }
    });
  };
}

export default MainStore;
