import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import colors from '../../constants/colors';

export default function ProfileScreen() {
    const handleGoBack = () => {
        console.log('=== VOLTANDO PARA TELA INICIAL ===');
        router.back();
    };

    console.log('=== RENDERIZANDO PERFIL ===');

    return (
        <View style={styles.container}>
            {/* Header simples */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>

                <Text style={styles.title}>👤 Meu Perfil</Text>
            </View>

            {/* Conteúdo simples */}
            <View style={styles.content}>
                <Text style={styles.subtitle}>Tela de perfil funcionando!</Text>
                <Text style={styles.debug}>Debug: Componente renderizado</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        backgroundColor: colors.gray200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginRight: 20,
    },
    backButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.white,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subtitle: {
        fontSize: 20,
        color: colors.white,
        marginBottom: 16,
    },
    debug: {
        fontSize: 16,
        color: colors.yellow,
        fontWeight: '600',
    },
});
