import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { router } from 'expo-router';
import colors from '../../constants/colors';
import { useAuth } from '../../hooks/useAuth';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    const { signOut, user } = useAuth();

    const handleGoBack = () => {
        console.log('=== VOLTANDO PARA TELA INICIAL ===');
        router.back();
    };

    const handleEditProfile = () => {
        console.log('Editando perfil...');
    };

    const handleViewBadges = () => {
        console.log('Visualizando badges...');
    };

    const handleViewSpecialties = () => {
        console.log('Visualizando especialidades...');
    };

    const handleSettings = () => {
        console.log('Abrindo configurações...');
    };

    const handleHelp = () => {
        console.log('Abrindo ajuda...');
    };

    const handleLogout = async () => {
        Alert.alert(
            "Sair da Conta",
            "Tem certeza que deseja sair da sua conta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            console.log('=== FAZENDO LOGOUT ===');
                            await signOut();
                            console.log('Logout realizado com sucesso');

                            // Navegar para a tela de login
                            router.replace('/(auth)/signin/page');
                        } catch (error) {
                            console.error('Erro ao fazer logout:', error);
                            Alert.alert(
                                "Erro",
                                "Não foi possível fazer logout. Tente novamente.",
                                [{ text: "OK" }]
                            );
                        }
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header com foto e informações principais */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>

                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>JF</Text>
                        </View>
                        <TouchableOpacity style={styles.editAvatarButton}>
                            <Text style={styles.editAvatarIcon}>📷</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.userName}>João Ferreira</Text>
                    <Text style={styles.userRole}>Auditor Sênior</Text>
                    <Text style={styles.userEmail}>{user?.email || 'joao.ferreira@auditapp.com'}</Text>

                    <View style={styles.statusContainer}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Disponível para auditorias</Text>
                    </View>
                </View>
            </View>

            {/* Estatísticas principais */}
            <View style={styles.statsSection}>
                <Text style={styles.sectionTitle}>📊 Estatísticas</Text>
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>156</Text>
                        <Text style={styles.statLabel}>Auditorias</Text>
                        <Text style={styles.statSubtext}>Total</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>4.8</Text>
                        <Text style={styles.statLabel}>Avaliação</Text>
                        <Text style={styles.statSubtext}>Média</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>98%</Text>
                        <Text style={styles.statLabel}>Taxa de</Text>
                        <Text style={styles.statSubtext}>Sucesso</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>2.5</Text>
                        <Text style={styles.statLabel}>Anos de</Text>
                        <Text style={styles.statSubtext}>Experiência</Text>
                    </View>
                </View>
            </View>

            {/* Badges e conquistas */}
            <View style={styles.badgesSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>🏆 Badges e Conquistas</Text>
                    <TouchableOpacity onPress={handleViewBadges}>
                        <Text style={styles.seeAllText}>Ver todos</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesScroll}>
                    <View style={styles.badgeCard}>
                        <Text style={styles.badgeIcon}>🥇</Text>
                        <Text style={styles.badgeTitle}>Top Auditor</Text>
                        <Text style={styles.badgeDescription}>Melhor avaliação do mês</Text>
                    </View>
                    <View style={styles.badgeCard}>
                        <Text style={styles.badgeIcon}>⚡</Text>
                        <Text style={styles.badgeTitle}>Rápido</Text>
                        <Text style={styles.badgeDescription}>100+ auditorias em 30 dias</Text>
                    </View>
                    <View style={styles.badgeCard}>
                        <Text style={styles.badgeIcon}>🎯</Text>
                        <Text style={styles.badgeTitle}>Preciso</Text>
                        <Text style={styles.badgeDescription}>95%+ taxa de sucesso</Text>
                    </View>
                    <View style={styles.badgeCard}>
                        <Text style={styles.badgeIcon}>🌟</Text>
                        <Text style={styles.badgeTitle}>Estrela</Text>
                        <Text style={styles.badgeDescription}>5 avaliações consecutivas</Text>
                    </View>
                </ScrollView>
            </View>

            {/* Especialidades */}
            <View style={styles.specialtiesSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>🔧 Especialidades</Text>
                    <TouchableOpacity onPress={handleViewSpecialties}>
                        <Text style={styles.seeAllText}>Ver todas</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.specialtiesGrid}>
                    <View style={styles.specialtyCard}>
                        <Text style={styles.specialtyIcon}>🍽️</Text>
                        <Text style={styles.specialtyName}>Restaurantes</Text>
                        <Text style={styles.specialtyLevel}>Avançado</Text>
                    </View>
                    <View style={styles.specialtyCard}>
                        <Text style={styles.specialtyIcon}>☕</Text>
                        <Text style={styles.specialtyName}>Cafés</Text>
                        <Text style={styles.specialtyLevel}>Intermediário</Text>
                    </View>
                    <View style={styles.specialtyCard}>
                        <Text style={styles.specialtyIcon}>🍕</Text>
                        <Text style={styles.specialtyName}>Fast Food</Text>
                        <Text style={styles.specialtyLevel}>Avançado</Text>
                    </View>
                    <View style={styles.specialtyCard}>
                        <Text style={styles.specialtyIcon}>🍰</Text>
                        <Text style={styles.specialtyName}>Docerias</Text>
                        <Text style={styles.specialtyLevel}>Básico</Text>
                    </View>
                </View>
            </View>

            {/* Configurações e ações */}
            <View style={styles.actionsSection}>
                <Text style={styles.sectionTitle}>⚙️ Configurações</Text>

                <TouchableOpacity style={styles.actionCard} onPress={handleEditProfile}>
                    <View style={styles.actionIcon}>
                        <Text style={styles.actionIconText}>✏️</Text>
                    </View>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionTitle}>Editar Perfil</Text>
                        <Text style={styles.actionDescription}>Alterar informações pessoais</Text>
                    </View>
                    <Text style={styles.actionArrow}>→</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={handleSettings}>
                    <View style={styles.actionIcon}>
                        <Text style={styles.actionIconText}>⚙️</Text>
                    </View>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionTitle}>Configurações</Text>
                        <Text style={styles.actionDescription}>Preferências do app</Text>
                    </View>
                    <Text style={styles.actionArrow}>→</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard} onPress={handleHelp}>
                    <View style={styles.actionIcon}>
                        <Text style={styles.actionIconText}>❓</Text>
                    </View>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionTitle}>Ajuda e Suporte</Text>
                        <Text style={styles.actionDescription}>Central de ajuda</Text>
                    </View>
                    <Text style={styles.actionArrow}>→</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionCard, styles.logoutCard]} onPress={handleLogout}>
                    <View style={styles.actionIcon}>
                        <Text style={styles.actionIconText}>🚪</Text>
                    </View>
                    <View style={styles.actionContent}>
                        <Text style={styles.actionTitle}>Sair da Conta</Text>
                        <Text style={styles.actionDescription}>Fazer logout</Text>
                    </View>
                    <Text style={styles.actionArrow}>→</Text>
                </TouchableOpacity>
            </View>

            {/* Informações adicionais */}
            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>ℹ️ Informações</Text>

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Membro desde:</Text>
                        <Text style={styles.infoValue}>Janeiro 2023</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Última auditoria:</Text>
                        <Text style={styles.infoValue}>Hoje, 14:30</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Status da conta:</Text>
                        <Text style={styles.infoValue}>Verificada ✓</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    header: {
        backgroundColor: colors.black,
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
    },
    backButton: {
        backgroundColor: colors.gray200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    profileSection: {
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.yellow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 12,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: '800',
        color: colors.black,
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.black,
    },
    editAvatarIcon: {
        fontSize: 16,
    },
    userName: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.white,
        marginBottom: 8,
    },
    userRole: {
        fontSize: 18,
        color: colors.yellow,
        fontWeight: '600',
        marginBottom: 8,
    },
    userEmail: {
        fontSize: 16,
        color: colors.gray100,
        marginBottom: 20,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray200,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.yellow,
        marginRight: 8,
    },
    statusText: {
        fontSize: 14,
        color: colors.white,
        fontWeight: '600',
    },
    statsSection: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    statCard: {
        width: (width - 70) / 2,
        backgroundColor: colors.gray200,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    statNumber: {
        fontSize: 32,
        fontWeight: '800',
        color: colors.yellow,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
        marginBottom: 2,
        textAlign: 'center',
    },
    statSubtext: {
        fontSize: 12,
        color: colors.gray100,
        textAlign: 'center',
    },
    badgesSection: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    seeAllText: {
        fontSize: 14,
        color: colors.yellow,
        fontWeight: '600',
    },
    badgesScroll: {
        marginLeft: -20,
        paddingLeft: 20,
    },
    badgeCard: {
        backgroundColor: colors.gray200,
        borderRadius: 16,
        padding: 20,
        marginRight: 15,
        alignItems: 'center',
        minWidth: 120,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    badgeIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    badgeTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 4,
        textAlign: 'center',
    },
    badgeDescription: {
        fontSize: 12,
        color: colors.gray100,
        textAlign: 'center',
        lineHeight: 16,
    },
    specialtiesSection: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    specialtiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    specialtyCard: {
        width: (width - 70) / 2,
        backgroundColor: colors.gray200,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    specialtyIcon: {
        fontSize: 32,
        marginBottom: 12,
    },
    specialtyName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 4,
        textAlign: 'center',
    },
    specialtyLevel: {
        fontSize: 12,
        color: colors.yellow,
        fontWeight: '600',
        textAlign: 'center',
    },
    actionsSection: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    actionCard: {
        backgroundColor: colors.gray200,
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    logoutCard: {
        borderWidth: 2,
        borderColor: colors.red,
        backgroundColor: colors.gray200,
    },
    actionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    actionIconText: {
        fontSize: 24,
    },
    actionContent: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 2,
    },
    actionDescription: {
        fontSize: 14,
        color: colors.gray100,
    },
    actionArrow: {
        fontSize: 18,
        color: colors.yellow,
        fontWeight: '800',
    },
    infoSection: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        paddingBottom: 40,
    },
    infoCard: {
        backgroundColor: colors.gray200,
        borderRadius: 16,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray100,
    },
    infoLabel: {
        fontSize: 14,
        color: colors.gray100,
    },
    infoValue: {
        fontSize: 14,
        color: colors.white,
        fontWeight: '600',
    },
});

