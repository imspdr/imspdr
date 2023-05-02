import { TestStoreProvider } from "@src/store/TestStoreProvider";
import TestPageTemplate from "@src/template/TestTemplate";

export default function TestPage() {
  return (
    <TestStoreProvider>
      <TestPageTemplate />
    </TestStoreProvider>
  );
}
