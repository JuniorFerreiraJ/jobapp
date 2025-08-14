import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');

export default function StatsScreen() {
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
    const [selectedMetric, setSelectedMetric] = useState<'audits' | 'rating' | 'efficiency'>('audits');

    const handleGoBack = () => {
        console.log('=== VOLTANDO PARA TELA INICIAL ===');
        router.back();
    };

    const handlePeriodChange = (period: 'week' | 'month' | 'year') => {
        setSelectedPeriod(period);
        console.log('Período alterado para:', period);
    };

    const handleMetricChange = (metric: 'audits' | 'rating' | 'efficiency') => {
        setSelectedMetric(metric);
        console.log('Métrica alterada para:', metric);
    };

    const renderProgressBar = (percentage: number, color: string) => {
        return (
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: color }]} />
                </View>
                <Text style={styles.progressText}>{percentage}%</Text>
            </View>
        );
    };

    const renderChart = () => {
        const data = selectedPeriod === 'week' ? [12, 15, 8, 20, 18, 14, 16] :
            selectedPeriod === 'month' ? [45, 52, 48, 61, 58, 55, 62, 59, 65, 58, 52, 48] :
                [156, 189, 203, 178, 195, 212, 198, 185, 203, 218, 195, 189];

        const maxValue = Math.max(...data);
        const chartHeight = 120;

        return (
            <View style={styles.chartContainer}>
                <View style={styles.chartBars}>
                    {data.map((value, index) => {
                        const height = (value / maxValue) * chartHeight;
                        const isSelected = selectedMetric === 'audits';

                        return (
                            <View key={index} style={styles.chartBarContainer}>
                                <View style={[
                                    styles.chartBar,
                                    {
                                        height: height,
                                        backgroundColor: isSelected ? colors.yellow : colors.gray100
                                    }
                                ]} />
                                {selectedPeriod === 'week' && (
                                    <Text style={styles.chartLabel}>
                                        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][index]}
                                    </Text>
                                )}
                                {selectedPeriod === 'month' && (
                                    <Text style={styles.chartLabel}>
                                        {index + 1}
                                    </Text>
                                )}
                                {selectedPeriod === 'year' && (
                                    <Text style={styles.chartLabel}>
                                        {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][index]}
                                    </Text>
                                )}
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Text style={styles.backButtonText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>📊 Estatísticas</Text>
                <Text style={styles.subtitle}>Analise seu desempenho</Text>
            </View>

            {/* Seletor de período */}
            <View style={styles.periodSelector}>
                <TouchableOpacity
                    style={[styles.periodButton, selectedPeriod === 'week' && styles.activePeriodButton]}
                    onPress={() => handlePeriodChange('week')}
                >
                    <Text style={[styles.periodButtonText, selectedPeriod === 'week' && styles.activePeriodButtonText]}>
                        Semana
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.periodButton, selectedPeriod === 'month' && styles.activePeriodButton]}
                    onPress={() => handlePeriodChange('month')}
                >
                    <Text style={[styles.periodButtonText, selectedPeriod === 'month' && styles.activePeriodButtonText]}>
                        Mês
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.periodButton, selectedPeriod === 'year' && styles.activePeriodButton]}
                    onPress={() => handlePeriodChange('year')}
                >
                    <Text style={[styles.periodButtonText, selectedPeriod === 'year' && styles.activePeriodButtonText]}>
                        Ano
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Métricas principais */}
            <View style={styles.mainMetrics}>
                <View style={styles.metricCard}>
                    <View style={styles.metricIcon}>
                        <Text style={styles.metricIconText}>📊</Text>
                    </View>
                    <Text style={styles.metricNumber}>24</Text>
                    <Text style={styles.metricLabel}>Auditorias</Text>
                    <Text style={styles.metricChange}>+12% vs mês anterior</Text>
                </View>

                <View style={styles.metricCard}>
                    <View style={styles.metricIcon}>
                        <Text style={styles.metricIconText}>⭐</Text>
                    </View>
                    <Text style={styles.metricNumber}>4.8</Text>
                    <Text style={styles.metricLabel}>Avaliação</Text>
                    <Text style={styles.metricChange}>+0.2 vs mês anterior</Text>
                </View>

                <View style={styles.metricCard}>
                    <View style={styles.metricIcon}>
                        <Text style={styles.metricIconText}>⚡</Text>
                    </View>
                    <Text style={styles.metricNumber}>98%</Text>
                    <Text style={styles.metricLabel}>Taxa de Sucesso</Text>
                    <Text style={styles.metricChange}>+3% vs mês anterior</Text>
                </View>
            </View>

            {/* Gráfico */}
            <View style={styles.chartSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>📈 Desempenho</Text>
                    <View style={styles.metricSelector}>
                        <TouchableOpacity
                            style={[styles.metricButton, selectedMetric === 'audits' && styles.activeMetricButton]}
                            onPress={() => handleMetricChange('audits')}
                        >
                            <Text style={[styles.metricButtonText, selectedMetric === 'audits' && styles.activeMetricButtonText]}>
                                Auditorias
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.metricButton, selectedMetric === 'rating' && styles.activeMetricButton]}
                            onPress={() => handleMetricChange('rating')}
                        >
                            <Text style={[styles.metricButtonText, selectedMetric === 'rating' && styles.activeMetricButtonText]}>
                                Avaliação
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.metricButton, selectedMetric === 'efficiency' && styles.activeMetricButton]}
                            onPress={() => handleMetricChange('efficiency')}
                        >
                            <Text style={[styles.metricButtonText, selectedMetric === 'efficiency' && styles.activeMetricButtonText]}>
                                Eficiência
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {renderChart()}
            </View>

            {/* Estatísticas detalhadas */}
            <View style={styles.detailedStats}>
                <Text style={styles.sectionTitle}>📋 Detalhamento</Text>

                <View style={styles.statRow}>
                    <View style={styles.statInfo}>
                        <Text style={styles.statLabel}>Tempo médio por auditoria</Text>
                        <Text style={styles.statValue}>1h 45min</Text>
                    </View>
                    {renderProgressBar(85, colors.yellow)}
                </View>

                <View style={styles.statRow}>
                    <View style={styles.statInfo}>
                        <Text style={styles.statLabel}>Auditorias concluídas no prazo</Text>
                        <Text style={styles.statValue}>96%</Text>
                    </View>
                    {renderProgressBar(96, colors.yellow)}
                </View>

                <View style={styles.statRow}>
                    <View style={styles.statInfo}>
                        <Text style={styles.statLabel}>Satisfação dos clientes</Text>
                        <Text style={styles.statValue}>4.9/5.0</Text>
                    </View>
                    {renderProgressBar(98, colors.yellow)}
                </View>

                <View style={styles.statRow}>
                    <View style={styles.statInfo}>
                        <Text style={styles.statLabel}>Taxa de aprovação</Text>
                        <Text style={styles.statValue}>94%</Text>
                    </View>
                    {renderProgressBar(94, colors.yellow)}
                </View>
            </View>

            {/* Comparação com outros auditores */}
            <View style={styles.comparisonSection}>
                <Text style={styles.sectionTitle}>🏆 Ranking</Text>

                <View style={styles.rankingCard}>
                    <View style={styles.rankingHeader}>
                        <Text style={styles.rankingTitle}>Top 5 Auditores</Text>
                        <Text style={styles.rankingPeriod}>Este mês</Text>
                    </View>

                    <View style={styles.rankingItem}>
                        <View style={styles.rankingPosition}>
                            <Text style={styles.rankingNumber}>1</Text>
                        </View>
                        <View style={styles.rankingInfo}>
                            <Text style={styles.rankingName}>João Ferreira</Text>
                            <Text style={styles.rankingStats}>24 auditorias • 4.8⭐</Text>
                        </View>
                        <View style={styles.rankingBadge}>
                            <Text style={styles.rankingBadgeText}>🥇</Text>
                        </View>
                    </View>

                    <View style={styles.rankingItem}>
                        <View style={styles.rankingPosition}>
                            <Text style={styles.rankingNumber}>2</Text>
                        </View>
                        <View style={styles.rankingInfo}>
                            <Text style={styles.rankingName}>Maria Silva</Text>
                            <Text style={styles.rankingStats}>22 auditorias • 4.7⭐</Text>
                        </View>
                        <View style={styles.rankingBadge}>
                            <Text style={styles.rankingBadgeText}>🥈</Text>
                        </View>
                    </View>

                    <View style={styles.rankingItem}>
                        <View style={styles.rankingPosition}>
                            <Text style={styles.rankingNumber}>3</Text>
                        </View>
                        <View style={styles.rankingInfo}>
                            <Text style={styles.rankingName}>Pedro Santos</Text>
                            <Text style={styles.rankingStats}>20 auditorias • 4.6⭐</Text>
                        </View>
                        <View style={styles.rankingBadge}>
                            <Text style={styles.rankingBadgeText}>🥉</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Resumo anual */}
            <View style={styles.yearlySummary}>
                <Text style={styles.sectionTitle}>📅 Resumo Anual</Text>

                <View style={styles.summaryGrid}>
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryIcon}>🎯</Text>
                        <Text style={styles.summaryNumber}>156</Text>
                        <Text style={styles.summaryLabel}>Total de Auditorias</Text>
                    </View>

                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryIcon}>⭐</Text>
                        <Text style={styles.summaryNumber}>4.8</Text>
                        <Text style={styles.summaryLabel}>Avaliação Média</Text>
                    </View>

                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryIcon}>💰</Text>
                        <Text style={styles.summaryNumber}>98%</Text>
                        <Text style={styles.summaryLabel}>Taxa de Sucesso</Text>
                    </View>

                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryIcon}>⏱️</Text>
                        <Text style={styles.summaryNumber}>2.5</Text>
                        <Text style={styles.summaryLabel}>Anos de Experiência</Text>
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
        paddingBottom: 25,
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
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.white,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.gray100,
    },
    periodSelector: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 10,
    },
    periodButton: {
        flex: 1,
        backgroundColor: colors.gray200,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    activePeriodButton: {
        backgroundColor: colors.yellow,
    },
    periodButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
    activePeriodButtonText: {
        color: colors.black,
        fontWeight: '700',
    },
    mainMetrics: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 15,
        marginBottom: 30,
    },
    metricCard: {
        flex: 1,
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
    metricIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    metricIconText: {
        fontSize: 24,
    },
    metricNumber: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.white,
        marginBottom: 4,
    },
    metricLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.white,
        marginBottom: 8,
        textAlign: 'center',
    },
    metricChange: {
        fontSize: 12,
        color: colors.yellow,
        fontWeight: '600',
        textAlign: 'center',
    },
    chartSection: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    sectionHeader: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 15,
    },
    metricSelector: {
        flexDirection: 'row',
        gap: 10,
    },
    metricButton: {
        backgroundColor: colors.gray200,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    activeMetricButton: {
        backgroundColor: colors.yellow,
    },
    metricButtonText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '600',
    },
    activeMetricButtonText: {
        color: colors.black,
        fontWeight: '700',
    },
    chartContainer: {
        backgroundColor: colors.gray200,
        borderRadius: 16,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    chartBars: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: 160,
    },
    chartBarContainer: {
        alignItems: 'center',
        flex: 1,
    },
    chartBar: {
        width: 20,
        borderRadius: 10,
        marginBottom: 8,
    },
    chartLabel: {
        fontSize: 10,
        color: colors.gray100,
        textAlign: 'center',
    },
    detailedStats: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray200,
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    statInfo: {
        flex: 1,
        marginRight: 20,
    },
    statLabel: {
        fontSize: 14,
        color: colors.gray100,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.white,
    },
    progressBarContainer: {
        alignItems: 'center',
        minWidth: 80,
    },
    progressBar: {
        width: 60,
        height: 8,
        backgroundColor: colors.gray100,
        borderRadius: 4,
        marginBottom: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        color: colors.yellow,
        fontWeight: '600',
    },
    comparisonSection: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    rankingCard: {
        backgroundColor: colors.gray200,
        borderRadius: 16,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    rankingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    rankingTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.white,
    },
    rankingPeriod: {
        fontSize: 14,
        color: colors.gray100,
    },
    rankingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray100,
    },
    rankingPosition: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    rankingNumber: {
        fontSize: 14,
        fontWeight: '800',
        color: colors.black,
    },
    rankingInfo: {
        flex: 1,
    },
    rankingName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
        marginBottom: 2,
    },
    rankingStats: {
        fontSize: 12,
        color: colors.gray100,
    },
    rankingBadge: {
        marginLeft: 10,
    },
    rankingBadgeText: {
        fontSize: 20,
    },
    yearlySummary: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        paddingBottom: 40,
    },
    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    summaryCard: {
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
    summaryIcon: {
        fontSize: 32,
        marginBottom: 12,
    },
    summaryNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.yellow,
        marginBottom: 4,
    },
    summaryLabel: {
        fontSize: 12,
        color: colors.gray100,
        textAlign: 'center',
        lineHeight: 16,
    },
});

