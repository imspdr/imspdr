import { TimeseriesStoreProvider } from "../store/TimeseriesStoreProvider";
import TimeseriesTemplate from "../template/TimeseriesTemplate";

export default function TimeseriesPage() {
  return (
    <TimeseriesStoreProvider>
      <TimeseriesTemplate />
    </TimeseriesStoreProvider>
  );
}
