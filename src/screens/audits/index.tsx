import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { router } from 'expo-router';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

interface ScheduledAudit {
    id: string;
    restaurant: string;
    address: string;
    date: string;
    time: string;
    type: string;
    priority: 'high' | 'medium' | 'low';
    estimatedDuration: string;
}

interface CompletedAudit {
    id: string;
    restaurant: string;
    address: string;
    completedDate: string;
    rating: number;
    status: 'completed' | 'pending_review';
    totalScore: number;
    maxScore: number;
}

interface Audit {
    id: string;
    restaurant: string;
    address: string;
    date?: string;
    time?: string;
    type?: string;
    priority?: 'high' | 'medium' | 'low';
    estimatedDuration?: string;
    completedDate?: string;
    rating?: number;
    status?: 'completed' | 'pending_review';
    totalScore?: number;
    maxScore?: number;
}

function isScheduledAudit(audit: Audit): audit is ScheduledAudit {
    return 'date' in audit && 'time' in audit;
}

export default function AuditsScreen() {
    const [activeTab, setActiveTab] = useState<'scheduled' | 'completed'>('scheduled');
    const [searchQuery, setSearchQuery] = useState('');

    const scheduledAudits: ScheduledAudit[] = [
        {
            id: '1',
            restaurant: 'Restaurante Sabor & Arte',
            address: 'Rua das Flores, 123 - Centro',
            date: '15/12/2024',
            time: '14:00',
            type: 'Qualidade Geral',
            priority: 'high',
            estimatedDuration: '2h 30min'
        },
        {
            id: '2',
            restaurant: 'Cantinho Italiano',
            address: 'Av. Principal, 456 - Jardim Europa',
            date: '16/12/2024',
            time: '10:00',
            type: 'Higiene e Limpeza',
            priority: 'medium',
            estimatedDuration: '1h 45min'
        },
        {
            id: '3',
            restaurant: 'Churrascaria Gaúcha',
            address: 'Rua do Comércio, 789 - Vila Nova',
            date: '17/12/2024',
            time: '18:00',
            type: 'Atendimento',
            priority: 'low',
            estimatedDuration: '2h 00min'
        },
        {
            id: '4',
            restaurant: 'Pizzaria Forno a Lenha',
            address: 'Travessa da Pizza, 321 - Bairro Alto',
            date: '18/12/2024',
            time: '12:00',
            type: 'Qualidade Geral',
            priority: 'high',
            estimatedDuration: '1h 30min'
        },
        {
            id: '5',
            restaurant: 'Restaurante Japonês Sakura',
            address: 'Alameda das Cerejeiras, 654 - Jardim Oriental',
            date: '19/12/2024',
            time: '19:00',
            type: 'Higiene e Limpeza',
            priority: 'medium',
            estimatedDuration: '2h 15min'
        }
    ];

    const completedAudits: CompletedAudit[] = [
        {
            id: '6',
            restaurant: 'Café da Manhã',
            address: 'Rua do Café, 111 - Centro',
            completedDate: '10/12/2024',
            rating: 4.5,
            status: 'completed',
            totalScore: 85,
            maxScore: 100
        },
        {
            id: '7',
            restaurant: 'Hamburgueria Artesanal',
            address: 'Av. dos Hambúrgueres, 222 - Vila Gourmet',
            completedDate: '08/12/2024',
            rating: 4.8,
            status: 'completed',
            totalScore: 92,
            maxScore: 100
        },
        {
            id: '8',
            restaurant: 'Restaurante Vegano',
            address: 'Rua Verde, 333 - Bairro Ecológico',
            completedDate: '05/12/2024',
            rating: 4.2,
            status: 'pending_review',
            totalScore: 78,
            maxScore: 100
        },
        {
            id: '9',
            restaurant: 'Doceria Tradicional',
            address: 'Travessa dos Doces, 444 - Centro Histórico',
            completedDate: '03/12/2024',
            rating: 4.7,
            status: 'completed',
            totalScore: 89,
            maxScore: 100
        },
        {
            id: '10',
            restaurant: 'Restaurante de Frutos do Mar',
            address: 'Avenida Beira Mar, 555 - Zona Portuária',
            completedDate: '01/12/2024',
            rating: 4.6,
            status: 'completed',
            totalScore: 87,
            maxScore: 100
        }
    ];

    const handleGoBack = () => {
        console.log('=== VOLTANDO PARA TELA INICIAL ===');
        router.back();
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return colors.red;
            case 'medium': return colors.yellow;
            case 'low': return colors.gray100;
            default: return colors.gray100;
        }
    };

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'high': return 'Alta';
            case 'medium': return 'Média';
            case 'low': return 'Baixa';
            default: return 'N/A';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return colors.yellow;
            case 'pending_review': return colors.orange;
            default: return colors.gray100;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Concluída';
            case 'pending_review': return 'Aguardando';
            default: return 'N/A';
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Text key={i} style={styles.star}>⭐</Text>);
        }

        if (hasHalfStar) {
            stars.push(<Text key="half" style={styles.star}>⭐</Text>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Text key={`empty-${i}`} style={styles.emptyStar}>☆</Text>);
        }

        return stars;
    };

    return (
        <View style={styles.container}>
            {/* Header com gradiente */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>🔍 Auditorias</Text>
                <View style={styles.headerStats}>
                    <Text style={styles.headerStatText}>
                        {scheduledAudits.length} Agendadas
                    </Text>
                </View>
            </View>

            {/* Barra de pesquisa */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar restaurantes..."
                        placeholderTextColor={colors.gray100}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'scheduled' && styles.activeTab]}
                    onPress={() => setActiveTab('scheduled')}
                >
                    <Text style={[styles.tabText, activeTab === 'scheduled' && styles.activeTabText]}>
                        Agendadas ({scheduledAudits.length})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
                    onPress={() => setActiveTab('completed')}
                >
                    <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
                        Concluídas ({completedAudits.length})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Conteúdo das tabs */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {activeTab === 'scheduled' ? (
                    <View style={styles.auditsList}>
                        {scheduledAudits.map((audit) => (
                            <View key={audit.id} style={styles.auditCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.restaurantInfo}>
                                        <Text style={styles.restaurantName}>{audit.restaurant}</Text>
                                        <Text style={styles.restaurantAddress}>{audit.address}</Text>
                                    </View>
                                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(audit.priority) }]}>
                                        <Text style={styles.priorityText}>{getPriorityText(audit.priority)}</Text>
                                    </View>
                                </View>

                                <View style={styles.cardDetails}>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>📅 Data:</Text>
                                        <Text style={styles.detailValue}>{audit.date}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>🕐 Horário:</Text>
                                        <Text style={styles.detailValue}>{audit.time}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>📋 Tipo:</Text>
                                        <Text style={styles.detailValue}>{audit.type}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>⏱️ Duração:</Text>
                                        <Text style={styles.detailValue}>{audit.estimatedDuration}</Text>
                                    </View>
                                </View>

                                <View style={styles.cardActions}>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <Text style={styles.actionButtonText}>Ver Detalhes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
                                        <Text style={styles.primaryButtonText}>Iniciar Auditoria</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.auditsList}>
                        {completedAudits.map((audit) => (
                            <View key={audit.id} style={styles.auditCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.restaurantInfo}>
                                        <Text style={styles.restaurantName}>{audit.restaurant}</Text>
                                        <Text style={styles.restaurantAddress}>{audit.address}</Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(audit.status) }]}>
                                        <Text style={styles.statusText}>{getStatusText(audit.status)}</Text>
                                    </View>
                                </View>

                                <View style={styles.cardDetails}>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>✅ Concluída em:</Text>
                                        <Text style={styles.detailValue}>{audit.completedDate}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>⭐ Avaliação:</Text>
                                        <View style={styles.ratingContainer}>
                                            {renderStars(audit.rating)}
                                            <Text style={styles.ratingText}>{audit.rating}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>📊 Pontuação:</Text>
                                        <Text style={styles.detailValue}>
                                            {audit.totalScore}/{audit.maxScore} pontos
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.cardActions}>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <Text style={styles.actionButtonText}>Ver Relatório</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                                        <Text style={styles.secondaryButtonText}>Editar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
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
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
    },
    backButton: {
        backgroundColor: colors.gray200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 15,
    },
    backButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.white,
        marginBottom: 10,
    },
    headerStats: {
        backgroundColor: colors.yellow,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    headerStatText: {
        color: colors.black,
        fontSize: 14,
        fontWeight: '700',
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray200,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: colors.white,
        fontSize: 16,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderRadius: 12,
        backgroundColor: colors.gray200,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: colors.yellow,
    },
    tabText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
    activeTabText: {
        color: colors.black,
        fontWeight: '700',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    auditsList: {
        gap: 15,
        paddingBottom: 20,
    },
    auditCard: {
        backgroundColor: colors.gray200,
        borderRadius: 16,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    restaurantInfo: {
        flex: 1,
        marginRight: 15,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 4,
    },
    restaurantAddress: {
        fontSize: 14,
        color: colors.gray100,
        lineHeight: 20,
    },
    priorityBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    priorityText: {
        color: colors.black,
        fontSize: 12,
        fontWeight: '700',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        color: colors.black,
        fontSize: 12,
        fontWeight: '700',
    },
    cardDetails: {
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: colors.gray100,
        flex: 1,
    },
    detailValue: {
        fontSize: 14,
        color: colors.white,
        fontWeight: '600',
        textAlign: 'right',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        fontSize: 16,
        marginRight: 2,
    },
    emptyStar: {
        fontSize: 16,
        marginRight: 2,
        color: colors.gray100,
    },
    ratingText: {
        fontSize: 14,
        color: colors.white,
        fontWeight: '600',
        marginLeft: 8,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        flex: 1,
        backgroundColor: colors.gray100,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
    primaryButton: {
        backgroundColor: colors.yellow,
    },
    primaryButtonText: {
        color: colors.black,
        fontSize: 14,
        fontWeight: '700',
    },
    secondaryButton: {
        backgroundColor: colors.orange,
    },
    secondaryButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '700',
    },
});
