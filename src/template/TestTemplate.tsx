import { observer } from "mobx-react";
import { useTestStore } from "@src/store/TestStoreProvider";

function TestPageTemplate() {
  const testStore = useTestStore();
  return <div>{`${testStore.testId}`}</div>;
}

export default observer(TestPageTemplate);
