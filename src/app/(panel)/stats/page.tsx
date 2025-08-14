import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

export default function StatsPage() {
    useEffect(() => {
        console.log('=== STATS PAGE RENDERIZADA ===');
        console.log('StatsPage foi montada com sucesso');
    }, []);

    console.log('=== RENDERIZANDO STATS PAGE ===');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📊 Estatísticas</Text>
            <Text style={styles.subtitle}>Tela funcionando!</Text>
            <Text style={styles.debug}>Debug: Componente renderizado</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: colors.white,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        color: colors.gray100,
        fontWeight: '600',
        marginBottom: 16,
    },
    debug: {
        fontSize: 14,
        color: colors.yellow,
        fontWeight: '600',
    },
});
