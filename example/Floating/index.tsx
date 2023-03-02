import React, { useEffect, useRef, useState } from 'react'
import { AppRegistry, BackHandler, Pressable, StyleSheet, Text, View } from 'react-native'
import Overlay from 'hybrid-navigation-overlay'
import { statusBarHeight } from 'hybrid-navigation'

import Ball from './Ball'
import Menu from './Menu'

const menus = ['菜单1', '菜单2', '菜单3']

function App() {
  useEffect(() => {
    const handlePress = () => {
      Overlay.hide('__overlay_floating__')
      return true
    }
    const subscription = BackHandler.addEventListener('hardwareBackPress', handlePress)

    return () => subscription.remove()
  }, [])

  const [menuVisible, setMenuVisible] = useState(false)

  const left = useRef(16)
  const top = useRef(statusBarHeight())

  const anchor = {
    x: left.current,
    y: top.current,
    size: 64,
  }

  function renderAnchor() {
    return (
      <View style={styles.ball}>
        <Text>Menu</Text>
      </View>
    )
  }

  function renderMenuItem(text: string, collapse: () => void) {
    return (
      <Pressable style={styles.item} key={text} onPress={collapse}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    )
  }

  const renderMenuContent = (collapse: () => void) => {
    return <>{menus.map(text => renderMenuItem(text, collapse))}</>
  }

  if (menuVisible) {
    return (
      <Menu
        anchor={anchor}
        renderAnchor={renderAnchor}
        menuHeight={48 * menus.length}
        renderMenuContent={renderMenuContent}
        onClose={() => setMenuVisible(false)}
      />
    )
  }

  return (
    <Ball
      anchor={anchor}
      onPress={() => setMenuVisible(true)}
      onPositionChange={(x, y) => {
        left.current = x
        top.current = y
      }}>
      {renderAnchor()}
    </Ball>
  )
}

const styles = StyleSheet.create({
  ball: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 48,
    justifyContent: 'center',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
  },
  text: {
    color: '#222222',
    fontSize: 17,
  },
})

function registerIfNeeded() {
  if (AppRegistry.getAppKeys().includes('__overlay_floating__')) {
    return
  }
  AppRegistry.registerComponent('__overlay_floating__', () => App)
}

function show() {
  registerIfNeeded()
  Overlay.show('__overlay_floating__', { passThroughTouches: true })
}

function hide() {
  Overlay.hide('__overlay_floating__')
}

const Floating = { show, hide }

export default Floating
