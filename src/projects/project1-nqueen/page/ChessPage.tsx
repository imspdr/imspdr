import { ChessStoreProvider } from "../store/ChessStoreProvider";
import ChessTemplate from "../template/ChessTemplate";

export default function ChessPage() {
  return (
    <ChessStoreProvider>
      <ChessTemplate />
    </ChessStoreProvider>
  );
}
