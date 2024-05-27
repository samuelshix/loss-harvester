export type LossHarvester = {
    "version": "0.1.0",
    "name": "loss_harvester",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "payerNftMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "payerNftAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "lossHarvester",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "trade",
            "accounts": [
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "nftAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "payerNftAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "payerNftMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "lossHarvester",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "lossHarvester",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "payerKey",
                        "type": "publicKey"
                    }
                ]
            }
        }
    ]
};

export const IDL: LossHarvester = {
    "version": "0.1.0",
    "name": "loss_harvester",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "payerNftMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "payerNftAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "lossHarvester",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "trade",
            "accounts": [
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "nftAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "payerNftAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "payerNftMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "lossHarvester",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "lossHarvester",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "payerKey",
                        "type": "publicKey"
                    }
                ]
            }
        }
    ]
};
