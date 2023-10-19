import { TestStoreProvider } from "../store/TestStoreProvider";
import TestPageTemplate from "../template/TestTemplate";

export default function TestPage() {
  return (
    <TestStoreProvider>
      <TestPageTemplate />
    </TestStoreProvider>
  );
}
