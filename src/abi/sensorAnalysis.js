export const sensorAnalysisAddress =
  "0x6824a86405E4E554F8c633A8974445827f84F436";

export const sensorAnalysisABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Crops",
    outputs: [
      {
        internalType: "uint256",
        name: "plantAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endorser",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cropID",
        type: "uint256",
      },
    ],
    name: "get",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "key",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "unit",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "updateAt",
            type: "uint256",
          },
        ],
        internalType: "struct SensorAnalysis.Indicator[]",
        name: "indicators",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cropID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "plantAt",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "string",
            name: "key",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "unit",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "updateAt",
            type: "uint256",
          },
        ],
        internalType: "struct SensorAnalysis.Indicator[]",
        name: "indicators",
        type: "tuple[]",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
