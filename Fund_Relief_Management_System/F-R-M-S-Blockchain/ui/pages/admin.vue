<template >
    <v-container class="form">
        <v-form>
            <v-col>
                <v-row>
                    <v-text-field placeholder="description" v-model="description"></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field placeholder="value" v-model="value"></v-text-field>
                </v-row>
                <v-row>
                    <v-btn block @click="post()">Post</v-btn>
                </v-row>
            </v-col>
        </v-form>
    </v-container>
</template>
<script>
import web3 from "xdc3";

const abi = [
    {
        "inputs": [],
        "name": "contribute",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "address payable",
                "name": "_recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "createRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRefund",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestNo",
                "type": "uint256"
            }
        ],
        "name": "makePayment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_goal",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_deadline",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "ContributeEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "CreateRequestEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "MakePaymentEvent",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_requestNo",
                "type": "uint256"
            }
        ],
        "name": "voteRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "contributors",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "deadline",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllRequests",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "goal",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minimumContribution",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "noOfContributors",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numRequests",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "raisedAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "requests",
        "outputs": [
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "address payable",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "completed",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "noOfVoters",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export default {
    name: "admin",
    data: () => ({
        description: "",
        value: ""
    }),
    methods: {
        async post() {
            let post = {
                description: this.description,
                value: this.value
            }
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            } else {
                window.alert(
                    "Non-Xinfin browser detected. You should consider trying XDCpay"
                );
            }
            if (!window.web3) {
                console.log(window.web3)
                return null;
            } else {
                console.log(window.web3)
            }
            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts()

            console.log(accounts)
        }
    }
}
</script>
<style>
.form {
    width: 500px;
    margin: 10% auto;
}

</style>