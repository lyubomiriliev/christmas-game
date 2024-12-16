import React from "react";
import dynamic from "next/dynamic";

const SnowfallEffect = () => {
  const Snowfall = dynamic(() => import("react-snowfall"), { ssr: false });

  return <Snowfall changeFrequency={600} snowflakeCount={1000} />;
};

export default React.memo(SnowfallEffect);
