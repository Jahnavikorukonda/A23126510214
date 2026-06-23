const Log = require("../logging-middleware/logger");

function solveKnapsack(vehicles, capacity) {
  const n = vehicles.length;

  const dp = Array.from(
    { length: n + 1 },
    () => Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const duration = vehicles[i - 1].Duration;
    const impact = vehicles[i - 1].Impact;

    for (let h = 0; h <= capacity; h++) {
      if (duration <= h) {
        dp[i][h] = Math.max(
          impact + dp[i - 1][h - duration],
          dp[i - 1][h]
        );
      } else {
        dp[i][h] = dp[i - 1][h];
      }
    }
  }

  let h = capacity;
  const selectedVehicles = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][h] !== dp[i - 1][h]) {
      selectedVehicles.push(vehicles[i - 1]);
      h -= vehicles[i - 1].Duration;
    }
  }

  return {
    totalImpact: dp[n][capacity],
    selectedVehicles: selectedVehicles.reverse(),
  };
}

async function runScheduler() {
  try {
    await Log(
      "backend",
      "info",
      "service",
      "Vehicle Scheduler Started"
    );

    // Sample data because evaluation server is timing out

    const depots = [
      {
        ID: 1,
        MechanicHours: 60,
      },
      {
        ID: 2,
        MechanicHours: 45,
      },
    ];

    const vehicles = [
      {
        TaskID: "V1",
        Duration: 10,
        Impact: 15,
      },
      {
        TaskID: "V2",
        Duration: 20,
        Impact: 40,
      },
      {
        TaskID: "V3",
        Duration: 30,
        Impact: 50,
      },
      {
        TaskID: "V4",
        Duration: 15,
        Impact: 25,
      },
      {
        TaskID: "V5",
        Duration: 25,
        Impact: 45,
      },
    ];

    const results = [];

    for (const depot of depots) {
      const result = solveKnapsack(
        vehicles,
        depot.MechanicHours
      );

      results.push({
        depotId: depot.ID,
        availableHours: depot.MechanicHours,
        totalImpact: result.totalImpact,
        selectedVehicles: result.selectedVehicles.map(
          (vehicle) => vehicle.TaskID
        ),
      });

      await Log(
        "backend",
        "info",
        "service",
        `Processed Depot ${depot.ID}`
      );
    }

    console.log(
      JSON.stringify(results, null, 2)
    );

    await Log(
      "backend",
      "info",
      "service",
      "Vehicle Scheduler Completed"
    );

  } catch (error) {

    console.error(error.message);

    try {
      await Log(
        "backend",
        "error",
        "service",
        error.message
      );
    } catch (_) {}
  }
}

module.exports = runScheduler;