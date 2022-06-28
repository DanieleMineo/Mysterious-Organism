// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}


// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    mutate (){
      const newBase = returnRandBase();
      const randInd = Math.floor(Math.random() * 15)
      while (this.dna[randInd] == newBase) {
        newBase = returnRandBase();
      };
      this.dna[randInd] = newBase
      return this.dna
    },
    compareDNA (newObj) {
      let mutualBases = 0
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] == newObj.dna[i]) {
          mutualBases++
        }
      }
      const percentage = ((mutualBases/15)*100).toFixed(2);
      console.log(`specimen #${this.specimenNum} and specimen #${newObj.specimenNum} have ${percentage}% DNA in common.`)
    },
    willLikelySurvive () {
      let numOfStrongBases = 0;
      for (k=0; k<this.dna.length; k++) {
        if (this.dna[k] == 'C' || this.dna[k] == 'G') {
          numOfStrongBases++
        }
      }
      let percOfStrongBases = Math.floor((numOfStrongBases/15)*100);
      if (percOfStrongBases >= 60) {
        return true
      } else {
        return false
      }
    },
    complementStrand() {
      let complementaryDna = [];
      for (let z = 0; z<this.dna.length; z++) {
        switch (this.dna[z]){
          case 'A':
          complementaryDna.push('T');
          break
          case 'T':
          complementaryDna.push('A');
          break
          case 'C':
          complementaryDna.push('G');
          break
          case 'G':
          complementaryDna.push('C');
          break
          default:
            complementaryDna.push('Invalid Base');
          break
        }
      }
      
      return complementaryDna
    }
  }
}

const strongPAequor = [];
let i = 1;
let count = 1; 
while (count != 30) {
  const creature = pAequorFactory(i, mockUpStrand())
  if (creature.willLikelySurvive() == true) {
    strongPAequor.push(creature);
    count++;
  } 
  i++
}

const creature1 = pAequorFactory(1, mockUpStrand())
console.log('normal dna ' + creature1.dna)
console.log('compl dna ' + creature1.complementStrand())

// console.log(strongPAequor)
// console.log(creature1)
// //console.log(creature.mutate())
// // console.log(creature.compareDNA(pAequorFactory(2, mockUpStrand())))
// console.log(creature1.willLikelySurvive())
