import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useTestStore } from "../store/TestStoreProvider";
import { Tabs, Tab } from "@mui/material";

function TestPageTemplate() {
  const testStore = useTestStore();
  const tabInfo: {
    label: string;
    value: number;
    comp: any;
  }[] = [
    {
      label: "폰트확인",
      value: 0,
      comp: <div>"폰트확인"</div>,
    },
    {
      label: "asd",
      value: 1,
      comp: <div>1</div>,
    },
    {
      label: "test3",
      value: 2,
      comp: <div>2</div>,
    },
    {
      label: "test4",
      value: 4,
      comp: <div>4</div>,
    },
    {
      label: "123",
      value: 5,
      comp: <div>5</div>,
    },
  ];

  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-width: 320px;
        `}
      >
        <Tabs
          value={testStore.tabValue}
          onChange={(e, v) => (testStore.tabValue = v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabInfo.map((tab) => (
            <Tab value={tab.value} label={tab.label} key={tab.label} />
          ))}
        </Tabs>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        `}
      >
        {tabInfo.find((tab) => tab.value === testStore.tabValue)?.comp}
      </div>
    </div>
  );
}

export default observer(TestPageTemplate);
