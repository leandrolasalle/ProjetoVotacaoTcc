// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {
    uint8 public constant CANDIDATES_COUNT = 30;

    // Armazenamos apenas hash do e-mail por privacidade básica
    mapping(bytes32 => bool) public hasVoted;
    uint256[CANDIDATES_COUNT] private _votes;
    string[CANDIDATES_COUNT] private _candidates;

    event Voted(bytes32 indexed emailHash, uint8 indexed candidateIndex);

    constructor() {
        _candidates = [
            "Candidato 01","Candidato 02","Candidato 03","Candidato 04","Candidato 05",
            "Candidato 06","Candidato 07","Candidato 08","Candidato 09","Candidato 10",
            "Candidato 11","Candidato 12","Candidato 13","Candidato 14","Candidato 15",
            "Candidato 16","Candidato 17","Candidato 18","Candidato 19","Candidato 20",
            "Candidato 21","Candidato 22","Candidato 23","Candidato 24","Candidato 25",
            "Candidato 26","Candidato 27","Candidato 28","Candidato 29","Candidato 30"
        ];
    }

    function vote(string calldata email, uint8 candidateIndex) external {
        require(candidateIndex < CANDIDATES_COUNT, "Indice invalido");
        // Use abi.encode (nao encodePacked) para evitar colisao com tipos dinamicos
        bytes32 emailHash = keccak256(abi.encode(email));
        require(!hasVoted[emailHash], "Este e-mail ja votou");
        hasVoted[emailHash] = true;
        _votes[candidateIndex] += 1;
        emit Voted(emailHash, candidateIndex);
    }

    function candidateName(uint8 index) external view returns (string memory) {
        require(index < CANDIDATES_COUNT, "Indice invalido");
        return _candidates[index];
    }

    function getCandidates() external view returns (string[] memory) {
        string[] memory out = new string[](CANDIDATES_COUNT);
        for (uint8 i = 0; i < CANDIDATES_COUNT; i++) {
            out[i] = _candidates[i];
        }
        return out;
    }

    function getAllVotes() external view returns (uint256[] memory) {
        uint256[] memory out = new uint256[](CANDIDATES_COUNT);
        for (uint8 i = 0; i < CANDIDATES_COUNT; i++) {
            out[i] = _votes[i];
        }
        return out;
    }

    function emailHasVoted(string calldata email) external view returns (bool) {
        bytes32 emailHash = keccak256(abi.encode(email));
        return hasVoted[emailHash];
    }
}
