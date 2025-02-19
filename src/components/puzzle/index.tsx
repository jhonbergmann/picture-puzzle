import React, {useCallback, useImperativeHandle, useMemo, useState, forwardRef} from 'react'
import {TouchableOpacity, Text, StyleSheet, View, Platform} from 'react-native'
import {PicturePuzzle, PuzzlePieces} from 'react-native-picture-puzzle'

function shuffle(array: any) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

export const Puzzle = forwardRef((_, ref) => {
  const originalPieces = useMemo<PuzzlePieces>(() => [...Array(16)].map((_, i) => i), [])
  const shuffledPieces = useMemo<PuzzlePieces>(() => {
    const p = [...originalPieces]
    shuffle(p)
    return p
  }, [originalPieces])

  const [hidden, setHidden] = useState<number | null>(null)
  const [pieces, setPieces] = useState<PuzzlePieces>(originalPieces)

  const source = useMemo(
    () => ({
      uri: 'https://raw.githubusercontent.com/jhonbergmann/picture-puzzle/refs/heads/main/src/assets/image-puzzle.jpg',
    }),
    [],
  )

  const onChange = useCallback(
    (nextPieces: PuzzlePieces, nextHidden: number | null): void => {
      setPieces([...nextPieces])
      setHidden(nextHidden)
    },
    [setPieces, setHidden],
  )

  const solve = useCallback(() => {
    setPieces(originalPieces)
    setHidden(null)
  }, [setPieces, originalPieces])

  const retry = useCallback(() => {
    setPieces(shuffledPieces)
    setHidden(0)
  }, [setPieces, shuffledPieces])

  useImperativeHandle(ref, () => ({
    solve,
    retry,
  }))

  return (
    <View style={{gap: 20}}>
      <PicturePuzzle style={styles.shadow} pieces={pieces} hidden={hidden} onChange={onChange} size={350} source={source} />
      <View>
        <View style={styles.row}>
          <TouchableOpacity onPress={retry}>
            <Text style={styles.buttonText}>Tentar Novamente</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={solve}>
            <Text style={styles.buttonText}>Resolver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
      android: {
        elevation: 50,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#010036',
    padding: 5,
    marginTop: 5,
    borderRadius: 24,
  },
})
