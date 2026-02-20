
import React, { useState, useEffect, useCallback } from 'react';
import {
    FaTachometerAlt, FaCloudSun, FaExclamationTriangle, FaCity,
    FaChartLine, FaHistory, FaUserShield, FaSearch, FaArrowLeft,
    FaPlus, FaEdit, FaCheckCircle, FaTimesCircle, FaUpload,
    FaTrash, FaDownload, FaFilter, FaSave, FaBars, FaCog, FaLink,
    FaEllipsisV, FaFileAlt, FaMapMarkerAlt, FaMicrochip, FaUsers,
    FaCalendarAlt, FaThermometerHalf, FaWind, FaTint, FaArrowRight,
    FaClock, FaHourglassHalf, FaThumbsUp, FaThumbsDown, FaEnvelopeOpenText,
    FaArchive, FaRegTimesCircle, FaRegCheckCircle, FaExclamationCircle,
    FaInfoCircle, FaHourglassEnd, FaHandPaper, FaFileInvoice
} from 'react-icons/fa';

// --- DUMMY DATA ---
const CITIES = [
    { id: 'city1', name: 'Mumbai', state: 'Maharashtra', country: 'India', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
    { id: 'city2', name: 'Delhi', state: 'Delhi', country: 'India', latitude: 28.7041, longitude: 77.1025, timezone: 'Asia/Kolkata' },
    { id: 'city3', name: 'Bengaluru', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata' },
    { id: 'city4', name: 'Kolkata', state: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata' },
    { id: 'city5', name: 'Chennai', state: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata' },
    { id: 'city6', name: 'Hyderabad', state: 'Telangana', country: 'India', latitude: 17.3850, longitude: 78.4867, timezone: 'Asia/Kolkata' },
    { id: 'city7', name: 'Pune', state: 'Maharashtra', country: 'India', latitude: 18.5204, longitude: 73.8567, timezone: 'Asia/Kolkata' },
    { id: 'city8', name: 'Ahmedabad', state: 'Gujarat', country: 'India', latitude: 23.0225, longitude: 72.5714, timezone: 'Asia/Kolkata' },
    { id: 'city9', name: 'Jaipur', state: 'Rajasthan', country: 'India', latitude: 26.9124, longitude: 75.7873, timezone: 'Asia/Kolkata' },
    { id: 'city10', name: 'Lucknow', state: 'Uttar Pradesh', country: 'India', latitude: 26.8467, longitude: 80.9462, timezone: 'Asia/Kolkata' },
];

const PREDICTION_MODELS = [
    { id: 'model1', name: 'GlobalForecastSystem (GFS)', version: '1.2', description: 'Global model from NOAA, 16-day forecasts.', lastRunDate: '2024-07-28T08:00:00Z', status: 'Active' },
    { id: 'model2', name: 'European Centre for Medium-Range Weather Forecasts (ECMWF)', version: '3.0', description: 'Highly accurate global model, 10-day forecasts.', lastRunDate: '2024-07-28T09:30:00Z', status: 'Active' },
    { id: 'model3', name: 'India Meteorological Department (IMD)', version: '2.1', description: 'Regional model for Indian subcontinent.', lastRunDate: '2024-07-28T10:00:00Z', status: 'Active' },
    { id: 'model4', name: 'Unified Model (UM)', version: '1.0', description: 'UK Met Office global model.', lastRunDate: '2024-07-27T23:00:00Z', status: 'Inactive' },
];

const initialForecasts = [
    {
        id: 'forecast1', cityId: 'city1', date: '2024-07-29', time: '10:00', temperatureC: 28, temperatureF: 82.4, conditions: 'Partly Cloudy', humidity: 75, windSpeed: 15, pressure: 1012, precipitation: 0, uvIndex: 6, predictionModelId: 'model1', notes: 'Monsoon activity expected to increase next week.',
        status: 'Published', workflowHistory: [
            { stage: 'Draft', by: 'Admin User', date: '2024-07-27T09:00:00Z', notes: 'Initial forecast data entered.', slaStatus: 'OK' },
            { stage: 'Pending Review', by: 'System', date: '2024-07-27T10:00:00Z', notes: 'Awaiting Admin review.', slaStatus: 'OK' },
            { stage: 'Published', by: 'Admin User', date: '2024-07-27T11:30:00Z', notes: 'Forecast published.', slaStatus: 'OK' }
        ], attachments: [{ name: 'forecast_chart_mumbai.png', url: '/chart1.png' }], createdBy: 'Admin User'
    },
    {
        id: 'forecast2', cityId: 'city2', date: '2024-07-29', time: '12:00', temperatureC: 35, temperatureF: 95, conditions: 'Sunny', humidity: 40, windSpeed: 10, pressure: 1008, precipitation: 0, uvIndex: 8, predictionModelId: 'model2', notes: 'Heatwave conditions continue.',
        status: 'Pending Review', workflowHistory: [
            { stage: 'Draft', by: 'Admin User', date: '2024-07-28T08:00:00Z', notes: 'Initial data for Delhi forecast.', slaStatus: 'OK' },
            { stage: 'Pending Review', by: 'System', date: '2024-07-28T09:00:00Z', notes: 'Awaiting review.', slaStatus: 'Warning' }
        ], attachments: [], createdBy: 'Admin User'
    },
    {
        id: 'forecast3', cityId: 'city3', date: '2024-07-29', time: '09:00', temperatureC: 25, temperatureF: 77, conditions: 'Light Rain', humidity: 85, windSpeed: 8, pressure: 1010, precipitation: 5, uvIndex: 4, predictionModelId: 'model3', notes: 'Intermittent light rain expected.',
        status: 'Draft', workflowHistory: [
            { stage: 'Draft', by: 'Admin User', date: '2024-07-28T14:00:00Z', notes: 'New forecast in draft state.', slaStatus: 'OK' }
        ], attachments: [], createdBy: 'Admin User'
    },
    {
        id: 'forecast4', cityId: 'city1', date: '2024-07-30', time: '10:00', temperatureC: 27, temperatureF: 80.6, conditions: 'Heavy Rain', humidity: 90, windSpeed: 25, pressure: 1005, precipitation: 20, uvIndex: 3, predictionModelId: 'model1', notes: 'Monsoon surge, possible localized flooding.',
        status: 'Published', workflowHistory: [
            { stage: 'Draft', by: 'Admin User', date: '2024-07-27T15:00:00Z', notes: 'Initial forecast.', slaStatus: 'OK' },
            { stage: 'Pending Review', by: 'System', date: '2024-07-27T16:00:00Z', notes: 'Awaiting review.', slaStatus: 'OK' },
            { stage: 'Published', by: 'Admin User', date: '2024-07-27T17:00:00Z', notes: 'Published forecast.', slaStatus: 'OK' }
        ], attachments: [], createdBy: 'Admin User'
    },
    {
        id: 'forecast5', cityId: 'city4', date: '2024-07-29', time: '11:00', temperatureC: 30, temperatureF: 86, conditions: 'Thunderstorms', humidity: 80, windSpeed: 20, pressure: 1009, precipitation: 10, uvIndex: 5, predictionModelId: 'model2', notes: 'Evening thunderstorms likely.',
        status: 'Rejected', workflowHistory: [
            { stage: 'Draft', by: 'Admin User', date: '2024-07-26T10:00:00Z', notes: 'Draft entry.', slaStatus: 'OK' },
            { stage: 'Pending Review', by: 'System', date: '2024-07-26T11:00:00Z', notes: 'For review.', slaStatus: 'OK' },
            { stage: 'Rejected', by: 'Admin User', date: '2024-07-26T14:00:00Z', notes: 'Temperature readings seemed off. Re-evaluation needed.', slaStatus: 'OK' }
        ], attachments: [], createdBy: 'Admin User'
    },
    {
        id: 'forecast6', cityId: 'city5', date: '2024-07-29', time: '14:00', temperatureC: 32, temperatureF: 89.6, conditions: 'Sunny', humidity: 60, windSpeed: 12, pressure: 1013, precipitation: 0, uvIndex: 7, predictionModelId: 'model3', notes: 'Hot and humid conditions.',
        status: 'Archived', workflowHistory: [
            { stage: 'Draft', by: 'Admin User', date: '2024-07-25T09:00:00Z', notes: 'Initial forecast.', slaStatus: 'OK' },
            { stage: 'Pending Review', by: 'System', date: '2024-07-25T10:00:00Z', notes: 'Awaiting review.', slaStatus: 'OK' },
            { stage: 'Published', by: 'Admin User', date: '2024-07-25T11:00:00Z', notes: 'Published.', slaStatus: 'OK' },
            { stage: 'Archived', by: 'Admin User', date: '2024-07-26T09:00:00Z', notes: 'Old forecast archived.', slaStatus: 'OK' }
        ], attachments: [], createdBy: 'Admin User'
    }
];

const initialAlerts = [
    {
        id: 'alert1', cityId: 'city1', type: 'Heavy Rainfall Warning', severity: 'High',
        startTime: '2024-07-29T00:00:00Z', endTime: '2024-07-30T00:00:00Z',
        message: 'Heavy rainfall expected in Mumbai and surrounding areas. Residents advised to stay indoors.',
        status: 'Active', createdBy: 'Admin User', attachments: []
    },
    {
        id: 'alert2', cityId: 'city2', type: 'Heatwave Advisory', severity: 'Medium',
        startTime: '2024-07-28T09:00:00Z', endTime: '2024-07-29T18:00:00Z',
        message: 'Continued heatwave conditions. Drink plenty of water, avoid direct sun.',
        status: 'Active', createdBy: 'Admin User', attachments: [{ name: 'heatwave_safety.pdf', url: '/safety.pdf' }]
    },
    {
        id: 'alert3', cityId: 'city3', type: 'Thunderstorm Watch', severity: 'Low',
        startTime: '2024-07-29T16:00:00Z', endTime: '2024-07-29T22:00:00Z',
        message: 'Isolated thunderstorms possible this evening in Bengaluru.',
        status: 'Draft', createdBy: 'Admin User', attachments: []
    },
    {
        id: 'alert4', cityId: 'city1', type: 'Coastal Flood Advisory', severity: 'Medium',
        startTime: '2024-07-28T18:00:00Z', endTime: '2024-07-29T06:00:00Z',
        message: 'High tide combined with heavy rain may cause coastal flooding in low-lying areas.',
        status: 'Resolved', createdBy: 'Admin User', attachments: []
    },
];

const initialAuditLogs = [
    { id: 'log1', userId: 'admin123', action: 'CREATE_FORECAST', entityType: 'Forecast', entityId: 'forecast3', timestamp: '2024-07-28T14:00:00Z', details: 'New forecast created for Bengaluru (Draft).' },
    { id: 'log2', userId: 'admin123', action: 'UPDATE_FORECAST_STATUS', entityType: 'Forecast', entityId: 'forecast2', timestamp: '2024-07-28T09:00:00Z', details: 'Forecast for Delhi changed to Pending Review.' },
    { id: 'log3', userId: 'admin123', action: 'CREATE_ALERT', entityType: 'Alert', entityId: 'alert3', timestamp: '2024-07-29T10:00:00Z', details: 'New thunderstorm watch alert in Draft for Bengaluru.' },
    { id: 'log4', userId: 'admin123', action: 'PUBLISH_FORECAST', entityType: 'Forecast', entityId: 'forecast1', timestamp: '2024-07-27T11:30:00Z', details: 'Forecast for Mumbai published.' },
    { id: 'log5', userId: 'admin123', action: 'UPDATE_ALERT_STATUS', entityType: 'Alert', entityId: 'alert4', timestamp: '2024-07-29T08:00:00Z', details: 'Coastal Flood Advisory for Mumbai resolved.' },
    { id: 'log6', userId: 'admin123', action: 'VIEW_DASHBOARD', entityType: 'System', entityId: 'N/A', timestamp: '2024-07-29T10:30:00Z', details: 'Admin user viewed dashboard.' },
    { id: 'log7', userId: 'admin123', action: 'EDIT_CITY', entityType: 'City', entityId: 'city1', timestamp: '2024-07-29T09:00:00Z', details: 'Mumbai city details updated (latitude/longitude).' },
];

const getStatusColorClass = (status) => {
    switch (status) {
        case 'Published':
        case 'Approved':
        case 'Completed':
        case 'Active':
        case 'Resolved':
            return 'green';
        case 'In Progress':
        case 'Pending Review':
        case 'Medium': // for alert severity
            return 'orange';
        case 'Rejected':
        case 'High': // for alert severity
        case 'SLA Breach':
            return 'red';
        case 'Draft':
        case 'Archived':
        case 'Inactive':
        case 'Low': // for alert severity
            return 'grey';
        case 'Assigned':
            return 'blue';
        case 'Exception':
        case 'Escalation':
            return 'purple';
        default:
            return 'grey';
    }
};

const getWorkflowStatusDetails = (currentStatus, history) => {
    const workflowStages = ['Draft', 'Pending Review', 'Published', 'Rejected', 'Archived'];
    return workflowStages.map(stage => {
        const entry = history.find(h => h.stage === stage);
        const isCurrent = stage === currentStatus;
        const isCompleted = workflowStages.indexOf(stage) < workflowStages.indexOf(currentStatus) || (stage === currentStatus && entry);

        let slaStatus = 'OK';
        if (entry && entry.slaStatus) {
            slaStatus = entry.slaStatus;
        } else if (isCurrent && !entry) { // Only check for current pending stage
            // Simulate SLA warning/breach for pending reviews
            const draftTime = history.find(h => h.stage === 'Draft')?.date;
            if (draftTime) {
                const diffHours = (new Date() - new Date(draftTime)) / (1000 * 60 * 60);
                if (stage === 'Pending Review' && diffHours > 24) slaStatus = 'Breach'; // 24hr breach
                else if (stage === 'Pending Review' && diffHours > 12) slaStatus = 'Warning'; // 12hr warning
            }
        }

        return {
            stage,
            isCompleted: isCompleted,
            isCurrent: isCurrent,
            date: entry?.date,
            by: entry?.by,
            slaStatus: slaStatus
        };
    });
};

// --- RBAC (Simple for Admin Persona) ---
const currentUser = { role: 'Admin', id: 'admin123' };
const canAccess = (feature, action = 'view') => {
    // With only Admin role, everything is accessible for this prototype
    if (currentUser.role === 'Admin') {
        return true;
    }
    // More complex logic would go here for other roles
    return false;
};

// --- TOAST NOTIFICATIONS ---
const Toast = ({ message, type, onClose }) => (
    <div className={`toast ${type}`}>
        <span className="toast-icon">
            {type === 'success' && <FaRegCheckCircle />}
            {type === 'error' && <FaRegTimesCircle />}
            {type === 'info' && <FaInfoCircle />}
        </span>
        {message}
        <button className="modal-close-button" onClick={onClose} style={{ position: 'static', marginLeft: 'auto', background: 'none', border: 'none' }}>&times;</button>
    </div>
);

// --- REUSABLE COMPONENTS ---
const Breadcrumb = ({ path, onNavigate }) => (
    <div className="breadcrumb">
        {path.map((item, index) => (
            <React.Fragment key={item.name}>
                <a href="#" onClick={() => onNavigate(item.screen)}>{item.name}</a>
                {index < path.length - 1 && <FaArrowRight size={10} />}
            </React.Fragment>
        ))}
    </div>
);

const IconButton = ({ onClick, icon: Icon, label, className = 'button-ghost', type = 'button' }) => (
    <button type={type} onClick={onClick} className={`button ${className}`}>
        <Icon /> {label}
    </button>
);

const ChartPlaceholder = ({ title, type }) => (
    <div className="chart-placeholder">
        <h3>{title} ({type} Chart) - Data Visualization Placeholder</h3>
    </div>
);

const FileUploadField = ({ onFileUpload, currentFiles = [] }) => {
    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map(file => ({
                name: file.name,
                url: URL.createObjectURL(file), // Dummy URL
                type: file.type,
                size: file.size,
            }));
            onFileUpload(newFiles);
        }
    };

    return (
        <div className="file-upload-container">
            <input type="file" onChange={handleFileChange} multiple />
            <p><FaUpload /> Drag & drop files here or click to browse</p>
            {currentFiles.length > 0 && (
                <div className="uploaded-files">
                    {currentFiles.map((file, index) => (
                        <div key={index} className="uploaded-file-item">
                            <span>{file.name}</span>
                            <a href={file.url} target="_blank" rel="noopener noreferrer">View</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- CORE APPLICATION COMPONENTS ---

const Header = ({ onSearch, navigate, toggleSidebar }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <header className="header">
            <IconButton icon={FaBars} onClick={toggleSidebar} className="button-ghost" />
            <h1>Weather Reporting System</h1>
            <form onSubmit={handleSearchSubmit} className="search-bar-floating">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Global Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
        </header>
    );
};

const Sidebar = ({ currentScreenName, navigate, isSidebarOpen }) => (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo">WRS</div>
        <nav>
            <ul>
                <li><a href="#" className={currentScreenName === 'Dashboard' ? 'active' : ''} onClick={() => navigate('Dashboard')}><FaTachometerAlt /> <span>Dashboard</span></a></li>
                <li><a href="#" className={currentScreenName === 'ForecastsList' ? 'active' : ''} onClick={() => navigate('ForecastsList')}><FaCloudSun /> <span>Forecasts</span></a></li>
                <li><a href="#" className={currentScreenName === 'AlertsList' ? 'active' : ''} onClick={() => navigate('AlertsList')}><FaExclamationTriangle /> <span>Alerts & Warnings</span></a></li>
                <li><a href="#" className={currentScreenName === 'CitiesList' ? 'active' : ''} onClick={() => navigate('CitiesList')}><FaCity /> <span>Cities</span></a></li>
                <li><a href="#" className={currentScreenName === 'PredictionModelsList' ? 'active' : ''} onClick={() => navigate('PredictionModelsList')}><FaMicrochip /> <span>Prediction Models</span></a></li>
                <li><a href="#" className={currentScreenName === 'AuditLogsList' ? 'active' : ''} onClick={() => navigate('AuditLogsList')}><FaHistory /> <span>Audit Logs</span></a></li>
                <li><a href="#" onClick={() => alert('Settings Clicked')}><FaCog /> <span>Settings</span></a></li>
            </ul>
        </nav>
    </aside>
);

const Dashboard = ({ navigate, addToast, forecasts, alerts }) => {
    if (!canAccess('Dashboard')) return <p>Access Denied</p>;

    const publishedForecasts = forecasts.filter(f => f.status === 'Published').length;
    const pendingForecasts = forecasts.filter(f => f.status === 'Pending Review').length;
    const activeAlerts = alerts.filter(a => a.status === 'Active').length;
    const totalForecasts = forecasts.length;
    const avgTemp = forecasts.length > 0
        ? (forecasts.reduce((sum, f) => sum + f.temperatureC, 0) / forecasts.length).toFixed(1)
        : 'N/A';

    const recentActivities = [...forecasts, ...alerts]
        .sort((a, b) => new Date(b.workflowHistory?.[b.workflowHistory.length - 1]?.date || b.startTime || b.date) - new Date(a.workflowHistory?.[a.workflowHistory.length - 1]?.date || a.startTime || a.date))
        .slice(0, 5);

    return (
        <div className="dashboard-content fade-in">
            <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Dashboard</h1>

            <section className="dashboard-section-header">
                <h2>Key Performance Indicators (KPIs)</h2>
                <IconButton icon={FaSyncAlt} label="Refresh" onClick={() => addToast({ message: 'KPIs Refreshed', type: 'info' })} />
            </section>
            <div className="dashboard-grid">
                <div className="card kpi-card realtime">
                    <div className="card-header">Total Forecasts</div>
                    <div className="kpi-value">{totalForecasts}</div>
                    <div className="card-footer">Updated in real-time</div>
                </div>
                <div className="card kpi-card realtime">
                    <div className="card-header">Published Forecasts</div>
                    <div className="kpi-value">{publishedForecasts}</div>
                    <div className="card-footer">Last 24h</div>
                </div>
                <div className="card kpi-card realtime">
                    <div className="card-header">Pending Approvals</div>
                    <div className="kpi-value">{pendingForecasts}</div>
                    <div className="card-footer">Action Required</div>
                </div>
                <div className="card kpi-card realtime">
                    <div className="card-header">Active Alerts</div>
                    <div className="kpi-value">{activeAlerts}</div>
                    <div className="card-footer">Urgent attention</div>
                </div>
                <div className="card kpi-card realtime">
                    <div className="card-header">Avg. Temperature (C)</div>
                    <div className="kpi-value">{avgTemp}°C</div>
                    <div className="card-footer">Across all forecasts</div>
                </div>
            </div>

            <section className="dashboard-section-header">
                <h2>Visualizations</h2>
                <div className="section-actions">
                    <IconButton icon={FaDownload} label="Export Charts" onClick={() => addToast({ message: 'Charts Exported', type: 'success' })} />
                </div>
            </section>
            <div className="dashboard-grid">
                <div className="card chart-card">
                    <ChartPlaceholder title="Forecasts by Status" type="Donut" />
                </div>
                <div className="card chart-card">
                    <ChartPlaceholder title="Temperature Trends (Last 7 Days)" type="Line" />
                </div>
                <div className="card chart-card">
                    <ChartPlaceholder title="Forecasts by City" type="Bar" />
                </div>
                <div className="card chart-card">
                    <ChartPlaceholder title="SLA Compliance - Forecast Approvals" type="Gauge" />
                </div>
            </div>

            <section className="dashboard-section-header" style={{ marginTop: 'var(--spacing-xxl)' }}>
                <h2>Recent Activities</h2>
                <div className="section-actions">
                    <IconButton icon={FaPlus} label="New Forecast" onClick={() => navigate('ForecastForm')} className="button-primary" />
                    <IconButton icon={FaExclamationTriangle} label="New Alert" onClick={() => navigate('AlertForm')} className="button-primary" />
                </div>
            </section>
            <div className="recent-activities-panel card-grid">
                {recentActivities.length > 0 ? recentActivities.map(item => {
                    const statusClass = getStatusColorClass(item.status);
                    const isForecast = item.cityId; // Simple check to differentiate
                    return (
                        <div key={item.id} className={`card status-${statusClass}`} style={{ cursor: 'default' }}>
                            <div className={`card-header status-${statusClass}`}>
                                {isForecast ? `Forecast for ${CITIES.find(c => c.id === item.cityId)?.name}` : `Alert for ${CITIES.find(c => c.id === item.cityId)?.name}`}
                            </div>
                            <div className="card-body">
                                {isForecast ? (
                                    <>
                                        <p><strong>Date:</strong> {item.date} {item.time}</p>
                                        <p><strong>Conditions:</strong> {item.conditions}</p>
                                    </>
                                ) : (
                                    <>
                                        <p><strong>Type:</strong> {item.type}</p>
                                        <p><strong>Severity:</strong> <span className={`status-badge ${getStatusColorClass(item.severity)}`}>{item.severity}</span></p>
                                    </>
                                )}
                            </div>
                            <div className="card-footer">
                                <span>Status: <span className={`status-ribbon ${statusClass}`} style={{ position: 'static' }}>{item.status}</span></span>
                                <span>Updated: {new Date(item.workflowHistory?.[item.workflowHistory.length - 1]?.date || item.startTime || item.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="empty-state">
                        <FaHistory />
                        <h3>No Recent Activity</h3>
                        <p>No new forecasts or alerts have been created or updated recently. Start by creating a new forecast or alert.</p>
                        <IconButton icon={FaPlus} label="Create New Forecast" onClick={() => navigate('ForecastForm')} className="button-primary" />
                    </div>
                )}
            </div>
        </div>
    );
};

const ForecastCard = ({ forecast, navigate }) => {
    const city = CITIES.find(c => c.id === forecast.cityId);
    const statusClass = getStatusColorClass(forecast.status);

    return (
        <div className={`card status-${statusClass}`} onClick={() => navigate('ForecastDetailView', forecast.id)}>
            <div className={`card-header status-${statusClass}`}>
                <span>{city?.name || 'Unknown City'} - {forecast.date}</span>
                <span className={`status-ribbon ${statusClass}`}>{forecast.status}</span>
            </div>
            <div className="card-body">
                <p><strong>Time:</strong> {forecast.time}</p>
                <p><strong>Conditions:</strong> {forecast.conditions}</p>
                <p><strong>Temperature:</strong> {forecast.temperatureC}°C / {forecast.temperatureF}°F</p>
                <p><strong>Wind:</strong> {forecast.windSpeed} km/h</p>
            </div>
            <div className="card-footer">
                <span>Model: {PREDICTION_MODELS.find(m => m.id === forecast.predictionModelId)?.name}</span>
                <span>Created By: {forecast.createdBy}</span>
            </div>
        </div>
    );
};

const ForecastForm = ({ forecast = {}, onSave, onCancel, addToast, cities, predictionModels, isNew = true }) => {
    const [formData, setFormData] = useState({
        id: forecast.id || `forecast${Date.now()}`,
        cityId: forecast.cityId || '',
        date: forecast.date || '',
        time: forecast.time || '12:00',
        temperatureC: forecast.temperatureC || '',
        conditions: forecast.conditions || '',
        humidity: forecast.humidity || '',
        windSpeed: forecast.windSpeed || '',
        pressure: forecast.pressure || '',
        precipitation: forecast.precipitation || '',
        uvIndex: forecast.uvIndex || '',
        predictionModelId: forecast.predictionModelId || '',
        notes: forecast.notes || '',
        attachments: forecast.attachments || [],
        status: forecast.status || 'Draft',
        workflowHistory: forecast.workflowHistory || [],
        createdBy: forecast.createdBy || currentUser.id,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (formData.temperatureC && !formData.temperatureF) {
            setFormData(prev => ({ ...prev, temperatureF: (formData.temperatureC * 9/5 + 32).toFixed(1) }));
        } else if (formData.temperatureF && !formData.temperatureC) {
            setFormData(prev => ({ ...prev, temperatureC: ((formData.temperatureF - 32) * 5/9).toFixed(1) }));
        }
    }, [formData.temperatureC, formData.temperatureF]);

    const validate = () => {
        const newErrors = {};
        if (!formData.cityId) newErrors.cityId = 'City is mandatory.';
        if (!formData.date) newErrors.date = 'Date is mandatory.';
        if (!formData.temperatureC) newErrors.temperatureC = 'Temperature is mandatory.';
        if (!formData.conditions) newErrors.conditions = 'Conditions are mandatory.';
        if (!formData.predictionModelId) newErrors.predictionModelId = 'Prediction Model is mandatory.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (newFiles) => {
        setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
        addToast({ message: `${newFiles.length} file(s) uploaded!`, type: 'success' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            addToast({ message: 'Please correct the form errors.', type: 'error' });
            return;
        }

        const updatedWorkflow = [...formData.workflowHistory];
        if (isNew) {
            updatedWorkflow.push({ stage: 'Draft', by: currentUser.id, date: new Date().toISOString(), notes: 'Initial forecast data created.', slaStatus: 'OK' });
        }

        onSave({ ...formData, workflowHistory: updatedWorkflow });
        addToast({ message: `Forecast ${isNew ? 'created' : 'updated'} successfully!`, type: 'success' });
    };

    return (
        <div className="form-container fade-in">
            <h2>{isNew ? 'Create New Weather Forecast' : `Edit Forecast for ${CITIES.find(c => c.id === formData.cityId)?.name}`}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cityId">City <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <select name="cityId" id="cityId" value={formData.cityId} onChange={handleChange}>
                        <option value="">Select a City</option>
                        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    {errors.cityId && <p className="error-message">{errors.cityId}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} />
                    {errors.date && <p className="error-message">{errors.date}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input type="time" name="time" id="time" value={formData.time} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="temperatureC">Temperature (°C) <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <input type="number" name="temperatureC" id="temperatureC" value={formData.temperatureC} onChange={handleChange} />
                    {errors.temperatureC && <p className="error-message">{errors.temperatureC}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="temperatureF">Temperature (°F)</label>
                    <input type="number" name="temperatureF" id="temperatureF" value={formData.temperatureF} onChange={handleChange} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="conditions">Conditions <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <input type="text" name="conditions" id="conditions" value={formData.conditions} onChange={handleChange} />
                    {errors.conditions && <p className="error-message">{errors.conditions}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="humidity">Humidity (%)</label>
                    <input type="number" name="humidity" id="humidity" value={formData.humidity} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="windSpeed">Wind Speed (km/h)</label>
                    <input type="number" name="windSpeed" id="windSpeed" value={formData.windSpeed} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="pressure">Pressure (hPa)</label>
                    <input type="number" name="pressure" id="pressure" value={formData.pressure} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="precipitation">Precipitation (mm)</label>
                    <input type="number" name="precipitation" id="precipitation" value={formData.precipitation} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="uvIndex">UV Index</label>
                    <input type="number" name="uvIndex" id="uvIndex" value={formData.uvIndex} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="predictionModelId">Prediction Model <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <select name="predictionModelId" id="predictionModelId" value={formData.predictionModelId} onChange={handleChange}>
                        <option value="">Select a Model</option>
                        {predictionModels.map(m => <option key={m.id} value={m.id}>{m.name} ({m.version})</option>)}
                    </select>
                    {errors.predictionModelId && <p className="error-message">{errors.predictionModelId}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Attachments</label>
                    <FileUploadField onFileUpload={handleFileUpload} currentFiles={formData.attachments} />
                </div>
                <div className="form-actions">
                    <IconButton icon={FaTimesCircle} label="Cancel" onClick={onCancel} className="button-ghost" />
                    <IconButton icon={FaSave} label="Save Forecast" type="submit" className="button-primary" />
                </div>
            </form>
        </div>
    );
};

const ForecastDetailView = ({ forecast, navigate, onUpdateForecast, addToast, cities, predictionModels }) => {
    if (!forecast) return <p>Forecast not found.</p>;
    if (!canAccess('Forecasts', 'view')) return <p>Access Denied</p>;

    const [isEditing, setIsEditing] = useState(false);
    const city = cities.find(c => c.id === forecast.cityId);
    const predictionModel = predictionModels.find(m => m.id === forecast.predictionModelId);
    const statusClass = getStatusColorClass(forecast.status);

    const handleSave = (updatedForecast) => {
        onUpdateForecast(updatedForecast.id, { ...updatedForecast, status: isEditing ? forecast.status : updatedForecast.status });
        setIsEditing(false);
        addToast({ message: 'Forecast details saved.', type: 'success' });
    };

    const handleStatusChange = (newStatus) => {
        const updatedWorkflow = [...forecast.workflowHistory, { stage: newStatus, by: currentUser.id, date: new Date().toISOString(), notes: `Status changed to ${newStatus}.`, slaStatus: 'OK' }];
        onUpdateForecast(forecast.id, { ...forecast, status: newStatus, workflowHistory: updatedWorkflow });
        addToast({ message: `Forecast status changed to ${newStatus}.`, type: 'info' });
    };

    const workflowStages = getWorkflowStatusDetails(forecast.status, forecast.workflowHistory);

    if (isEditing) {
        return <ForecastForm forecast={forecast} onSave={handleSave} onCancel={() => setIsEditing(false)} cities={cities} predictionModels={predictionModels} isNew={false} addToast={addToast} />;
    }

    return (
        <div className="full-screen-page fade-in">
            <div className="full-screen-page-header">
                <h2><FaCloudSun /> Forecast Details: {city?.name} ({forecast.date})</h2>
                <div>
                    {forecast.status === 'Pending Review' && (
                        <>
                            <IconButton icon={FaThumbsUp} label="Approve" onClick={() => handleStatusChange('Published')} className="button-primary" />
                            <IconButton icon={FaThumbsDown} label="Reject" onClick={() => handleStatusChange('Rejected')} className="button-danger" />
                        </>
                    )}
                    {forecast.status === 'Draft' && (
                        <IconButton icon={FaEnvelopeOpenText} label="Submit for Review" onClick={() => handleStatusChange('Pending Review')} className="button-primary" />
                    )}
                    {canAccess('Forecasts', 'edit') && (
                        <IconButton icon={FaEdit} label="Edit Forecast" onClick={() => setIsEditing(true)} className="button-secondary" />
                    )}
                    {(forecast.status === 'Published' || forecast.status === 'Rejected') && (
                        <IconButton icon={FaArchive} label="Archive" onClick={() => handleStatusChange('Archived')} className="button-ghost" />
                    )}
                    <IconButton icon={FaArrowLeft} label="Back to Forecasts" onClick={() => navigate('ForecastsList')} className="button-ghost" />
                </div>
            </div>

            <div className="full-screen-page-content">
                <Breadcrumb path={[{ name: 'Dashboard', screen: 'Dashboard' }, { name: 'Forecasts', screen: 'ForecastsList' }, { name: forecast.id, screen: 'ForecastDetailView', id: forecast.id }]} onNavigate={navigate} />

                <div className="card-grid" style={{ marginBottom: 'var(--spacing-xl)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    <div className={`card status-${statusClass}`} style={{ cursor: 'default' }}>
                        <div className={`card-header status-${statusClass}`}>General Information</div>
                        <div className="card-body">
                            <p><strong>City:</strong> {city?.name}</p>
                            <p><strong>Date:</strong> {forecast.date}</p>
                            <p><strong>Time:</strong> {forecast.time}</p>
                            <p><strong>Conditions:</strong> {forecast.conditions}</p>
                            <p><strong>Status:</strong> <span className={`status-ribbon ${statusClass}`} style={{ position: 'static' }}>{forecast.status}</span></p>
                        </div>
                    </div>
                    <div className="card" style={{ cursor: 'default' }}>
                        <div className="card-header">Weather Metrics</div>
                        <div className="card-body">
                            <p><FaThermometerHalf /> <strong>Temperature:</strong> {forecast.temperatureC}°C / {forecast.temperatureF}°F</p>
                            <p><FaTint /> <strong>Humidity:</strong> {forecast.humidity}%</p>
                            <p><FaWind /> <strong>Wind Speed:</strong> {forecast.windSpeed} km/h</p>
                            <p><FaHandPaper /> <strong>Pressure:</strong> {forecast.pressure} hPa</p>
                            <p><FaCloudRain /> <strong>Precipitation:</strong> {forecast.precipitation} mm</p>
                            <p><FaSun /> <strong>UV Index:</strong> {forecast.uvIndex}</p>
                        </div>
                    </div>
                    <div className="card" style={{ cursor: 'default' }}>
                        <div className="card-header">Prediction & Notes</div>
                        <div className="card-body">
                            <p><strong>Model:</strong> {predictionModel?.name} ({predictionModel?.version})</p>
                            <p><strong>Description:</strong> {predictionModel?.description}</p>
                            <p><strong>Notes:</strong> {forecast.notes || 'N/A'}</p>
                            <p><strong>Created By:</strong> {forecast.createdBy}</p>
                        </div>
                    </div>
                </div>

                <div className="workflow-tracker">
                    <h3><FaChartLine /> Workflow Progress</h3>
                    <div className="workflow-steps">
                        {workflowStages.map((stageDetail, index) => (
                            <div key={stageDetail.stage} className={`workflow-step ${stageDetail.isCompleted ? 'completed' : stageDetail.isCurrent ? 'current' : 'pending'}`}>
                                <div className="workflow-step-icon">
                                    {stageDetail.isCompleted ? <FaCheckCircle /> : stageDetail.isCurrent ? <FaHourglassHalf /> : <FaRegTimesCircle />}
                                </div>
                                <div className="workflow-step-label">{stageDetail.stage}</div>
                                {stageDetail.date && <div className="workflow-step-date">{new Date(stageDetail.date).toLocaleString()}</div>}
                                {stageDetail.by && <div className="workflow-step-date">by {stageDetail.by}</div>}
                                {stageDetail.isCurrent && stageDetail.slaStatus && (
                                    <div className={`sla-indicator ${stageDetail.slaStatus.toLowerCase()}`}>
                                        SLA: {stageDetail.slaStatus}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {forecast.attachments && forecast.attachments.length > 0 && (
                    <div className="card margin-top-lg" style={{ cursor: 'default' }}>
                        <div className="card-header">Attachments</div>
                        <div className="card-body">
                            {forecast.attachments.map((file, index) => (
                                <div key={index} className="uploaded-file-item" style={{ marginBottom: 'var(--spacing-xs)' }}>
                                    <span><FaFileAlt /> {file.name}</span>
                                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="button-ghost">View <FaExternalLinkAlt size={10} /></a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ForecastsList = ({ navigate, addToast, forecasts, setForecasts, cities, predictionModels }) => {
    if (!canAccess('ForecastsList')) return <p>Access Denied</p>;

    const [filters, setFilters] = useState({ cityId: '', status: '', date: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedForecasts, setSelectedForecasts] = useState([]);
    const [isTableView, setIsTableView] = useState(false); // New state for toggling view

    const filteredForecasts = forecasts.filter(forecast => {
        const city = cities.find(c => c.id === forecast.cityId);
        const matchesCity = filters.cityId ? forecast.cityId === filters.cityId : true;
        const matchesStatus = filters.status ? forecast.status === filters.status : true;
        const matchesDate = filters.date ? forecast.date === filters.date : true;
        const matchesSearch = searchTerm
            ? (city?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                forecast.conditions.toLowerCase().includes(searchTerm.toLowerCase()) ||
                forecast.date.includes(searchTerm))
            : true;
        return matchesCity && matchesStatus && matchesDate && matchesSearch;
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleBulkAction = (action) => {
        if (selectedForecasts.length === 0) {
            addToast({ message: 'No forecasts selected for bulk action.', type: 'info' });
            return;
        }
        const updatedForecasts = forecasts.map(f => {
            if (selectedForecasts.includes(f.id)) {
                let newStatus = f.status;
                if (action === 'publish') newStatus = 'Published';
                if (action === 'archive') newStatus = 'Archived';
                if (action === 'delete') return null; // Mark for deletion

                const updatedWorkflow = [...f.workflowHistory, { stage: newStatus, by: currentUser.id, date: new Date().toISOString(), notes: `Bulk action: ${action}.`, slaStatus: 'OK' }];
                return { ...f, status: newStatus, workflowHistory: updatedWorkflow };
            }
            return f;
        }).filter(Boolean); // Remove deleted ones

        setForecasts(updatedForecasts);
        setSelectedForecasts([]);
        addToast({ message: `${selectedForecasts.length} forecasts ${action}d successfully!`, type: 'success' });
    };

    const toggleSelectForecast = (id) => {
        setSelectedForecasts(prev =>
            prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedForecasts.length === filteredForecasts.length) {
            setSelectedForecasts([]);
        } else {
            setSelectedForecasts(filteredForecasts.map(f => f.id));
        }
    };

    return (
        <div className="fade-in">
            <div className="full-screen-page-header" style={{ position: 'relative', top: 'unset', left: 'unset', width: 'unset', padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
                <h2><FaCloudSun /> Weather Forecasts</h2>
                <div className="section-actions">
                    <IconButton icon={FaPlus} label="Create New Forecast" onClick={() => navigate('ForecastForm')} className="button-primary" />
                </div>
            </div>

            <div className="action-bar">
                <div className="left-actions">
                    <div className="search-bar-floating" style={{ width: '250px' }}>
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search Forecasts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <IconButton icon={FaFilter} label="Filters" onClick={() => alert('Open Filters Panel')} /> {/* Placeholder for side panel filter */}
                    <select name="cityId" onChange={handleFilterChange} value={filters.cityId} style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-md)', background: 'var(--bg-color-dark)', color: 'var(--text-color)' }}>
                        <option value="">All Cities</option>
                        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <select name="status" onChange={handleFilterChange} value={filters.status} style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-md)', background: 'var(--bg-color-dark)', color: 'var(--text-color)' }}>
                        <option value="">All Statuses</option>
                        {['Draft', 'Pending Review', 'Published', 'Rejected', 'Archived'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="right-actions">
                    {selectedForecasts.length > 0 && (
                        <>
                            <IconButton icon={FaCheckCircle} label={`Publish (${selectedForecasts.length})`} onClick={() => handleBulkAction('publish')} className="button-primary" />
                            <IconButton icon={FaArchive} label={`Archive (${selectedForecasts.length})`} onClick={() => handleBulkAction('archive')} className="button-secondary" />
                            <IconButton icon={FaTrash} label={`Delete (${selectedForecasts.length})`} onClick={() => handleBulkAction('delete')} className="button-danger" />
                        </>
                    )}
                    <IconButton icon={FaDownload} label="Export" onClick={() => addToast({ message: 'Forecasts Exported', type: 'success' })} />
                    <IconButton icon={isTableView ? FaThLarge : FaList} label={isTableView ? 'Card View' : 'Table View'} onClick={() => setIsTableView(!isTableView)} />
                </div>
            </div>

            {filteredForecasts.length === 0 ? (
                <div className="empty-state">
                    <FaCloudSun />
                    <h3>No Forecasts Found</h3>
                    <p>It looks like there are no forecasts matching your current filters. Try adjusting your search or filters.</p>
                    <IconButton icon={FaPlus} label="Create New Forecast" onClick={() => navigate('ForecastForm')} className="button-primary" />
                </div>
            ) : (
                isTableView ? (
                    <div className="grid-table-container">
                        <table className="grid-table">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" checked={selectedForecasts.length === filteredForecasts.length} onChange={toggleSelectAll} /></th>
                                    <th>City</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Conditions</th>
                                    <th>Temp (°C)</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredForecasts.map(forecast => {
                                    const city = cities.find(c => c.id === forecast.cityId);
                                    const statusClass = getStatusColorClass(forecast.status);
                                    return (
                                        <tr key={forecast.id}>
                                            <td className="checkbox-cell"><input type="checkbox" checked={selectedForecasts.includes(forecast.id)} onChange={() => toggleSelectForecast(forecast.id)} /></td>
                                            <td>{city?.name}</td>
                                            <td>{forecast.date}</td>
                                            <td>{forecast.time}</td>
                                            <td>{forecast.conditions}</td>
                                            <td>{forecast.temperatureC}</td>
                                            <td><span className={`status-badge ${statusClass}`}>{forecast.status}</span></td>
                                            <td className="action-buttons">
                                                <IconButton icon={FaEye} onClick={() => navigate('ForecastDetailView', forecast.id)} title="View" />
                                                {canAccess('Forecasts', 'edit') && <IconButton icon={FaEdit} onClick={() => navigate('ForecastDetailView', forecast.id, true)} title="Edit" />} {/* Pass true for edit mode */}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="card-grid">
                        {filteredForecasts.map(forecast => (
                            <ForecastCard key={forecast.id} forecast={forecast} navigate={navigate} />
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

// Alert Management Components
const AlertCard = ({ alert, navigate }) => {
    const city = CITIES.find(c => c.id === alert.cityId);
    const severityClass = getStatusColorClass(alert.severity);
    const statusClass = getStatusColorClass(alert.status);

    return (
        <div className={`card status-${severityClass}`} onClick={() => navigate('AlertDialogView', alert.id)}>
            <div className={`card-header status-${severityClass}`}>
                <span>{city?.name || 'Unknown City'} - {alert.type}</span>
                <span className={`status-ribbon ${statusClass}`}>{alert.status}</span>
            </div>
            <div className="card-body">
                <p><strong>Severity:</strong> <span className={`status-badge ${severityClass}`}>{alert.severity}</span></p>
                <p><strong>Starts:</strong> {new Date(alert.startTime).toLocaleString()}</p>
                <p><strong>Ends:</strong> {new Date(alert.endTime).toLocaleString()}</p>
                <p><strong>Message:</strong> {alert.message.substring(0, 70)}...</p>
            </div>
            <div className="card-footer">
                <span>Created By: {alert.createdBy}</span>
            </div>
        </div>
    );
};

const AlertForm = ({ alert = {}, onSave, onCancel, addToast, cities, isNew = true }) => {
    const [formData, setFormData] = useState({
        id: alert.id || `alert${Date.now()}`,
        cityId: alert.cityId || '',
        type: alert.type || '',
        severity: alert.severity || '',
        startTime: alert.startTime || new Date().toISOString().slice(0, 16),
        endTime: alert.endTime || new Date(Date.now() + 3600 * 1000 * 24).toISOString().slice(0, 16), // 24 hours from now
        message: alert.message || '',
        status: alert.status || 'Draft',
        attachments: alert.attachments || [],
        createdBy: alert.createdBy || currentUser.id,
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.cityId) newErrors.cityId = 'City is mandatory.';
        if (!formData.type) newErrors.type = 'Alert type is mandatory.';
        if (!formData.severity) newErrors.severity = 'Severity is mandatory.';
        if (!formData.startTime) newErrors.startTime = 'Start time is mandatory.';
        if (!formData.endTime) newErrors.endTime = 'End time is mandatory.';
        if (!formData.message) newErrors.message = 'Message is mandatory.';
        if (new Date(formData.startTime) >= new Date(formData.endTime)) {
            newErrors.endTime = 'End time must be after start time.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (newFiles) => {
        setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
        addToast({ message: `${newFiles.length} file(s) uploaded!`, type: 'success' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            addToast({ message: 'Please correct the form errors.', type: 'error' });
            return;
        }
        onSave(formData);
        addToast({ message: `Alert ${isNew ? 'created' : 'updated'} successfully!`, type: 'success' });
    };

    return (
        <div className="form-container fade-in">
            <h2>{isNew ? 'Create New Weather Alert' : `Edit Alert for ${CITIES.find(c => c.id === formData.cityId)?.name}`}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cityId">City <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <select name="cityId" id="cityId" value={formData.cityId} onChange={handleChange}>
                        <option value="">Select a City</option>
                        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    {errors.cityId && <p className="error-message">{errors.cityId}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="type">Alert Type <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} />
                    {errors.type && <p className="error-message">{errors.type}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="severity">Severity <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <select name="severity" id="severity" value={formData.severity} onChange={handleChange}>
                        <option value="">Select Severity</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    {errors.severity && <p className="error-message">{errors.severity}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="startTime">Start Time <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <input type="datetime-local" name="startTime" id="startTime" value={formData.startTime} onChange={handleChange} />
                    {errors.startTime && <p className="error-message">{errors.startTime}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="endTime">End Time <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <input type="datetime-local" name="endTime" id="endTime" value={formData.endTime} onChange={handleChange} />
                    {errors.endTime && <p className="error-message">{errors.endTime}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message <span style={{ color: 'var(--status-red)' }}>*</span></label>
                    <textarea name="message" id="message" value={formData.message} onChange={handleChange}></textarea>
                    {errors.message && <p className="error-message">{errors.message}</p>}
                </div>
                <div className="form-group">
                    <label>Attachments</label>
                    <FileUploadField onFileUpload={handleFileUpload} currentFiles={formData.attachments} />
                </div>
                <div className="form-actions">
                    <IconButton icon={FaTimesCircle} label="Cancel" onClick={onCancel} className="button-ghost" />
                    <IconButton icon={FaSave} label="Save Alert" type="submit" className="button-primary" />
                </div>
            </form>
        </div>
    );
};

const AlertDialogView = ({ alert, navigate, onUpdateAlert, addToast, cities }) => {
    if (!alert) return <p>Alert not found.</p>;
    if (!canAccess('Alerts', 'view')) return <p>Access Denied</p>;

    const [isEditing, setIsEditing] = useState(false);
    const city = cities.find(c => c.id === alert.cityId);
    const severityClass = getStatusColorClass(alert.severity);
    const statusClass = getStatusColorClass(alert.status);

    const handleSave = (updatedAlert) => {
        onUpdateAlert(updatedAlert.id, updatedAlert);
        setIsEditing(false);
        addToast({ message: 'Alert details saved.', type: 'success' });
    };

    const handleResolve = () => {
        onUpdateAlert(alert.id, { ...alert, status: 'Resolved' });
        addToast({ message: 'Alert marked as Resolved.', type: 'info' });
    };

    if (isEditing) {
        return <AlertForm alert={alert} onSave={handleSave} onCancel={() => setIsEditing(false)} cities={cities} isNew={false} addToast={addToast} />;
    }

    return (
        <div className="full-screen-page fade-in">
            <div className="full-screen-page-header">
                <h2><FaExclamationTriangle /> Alert Details: {city?.name} ({alert.type})</h2>
                <div>
                    {alert.status === 'Active' && (
                        <IconButton icon={FaCheckCircle} label="Resolve Alert" onClick={handleResolve} className="button-primary" />
                    )}
                    {canAccess('Alerts', 'edit') && (
                        <IconButton icon={FaEdit} label="Edit Alert" onClick={() => setIsEditing(true)} className="button-secondary" />
                    )}
                    <IconButton icon={FaArrowLeft} label="Back to Alerts" onClick={() => navigate('AlertsList')} className="button-ghost" />
                </div>
            </div>

            <div className="full-screen-page-content">
                <Breadcrumb path={[{ name: 'Dashboard', screen: 'Dashboard' }, { name: 'Alerts', screen: 'AlertsList' }, { name: alert.id, screen: 'AlertDialogView', id: alert.id }]} onNavigate={navigate} />

                <div className="card-grid" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <div className={`card status-${severityClass}`} style={{ cursor: 'default' }}>
                        <div className={`card-header status-${severityClass}`}>General Alert Information</div>
                        <div className="card-body">
                            <p><strong>City:</strong> {city?.name}</p>
                            <p><strong>Type:</strong> {alert.type}</p>
                            <p><strong>Severity:</strong> <span className={`status-badge ${severityClass}`}>{alert.severity}</span></p>
                            <p><strong>Status:</strong> <span className={`status-ribbon ${statusClass}`} style={{ position: 'static' }}>{alert.status}</span></p>
                        </div>
                    </div>
                    <div className="card" style={{ cursor: 'default' }}>
                        <div className="card-header">Timeline & Details</div>
                        <div className="card-body">
                            <p><FaClock /> <strong>Start Time:</strong> {new Date(alert.startTime).toLocaleString()}</p>
                            <p><FaHourglassEnd /> <strong>End Time:</strong> {new Date(alert.endTime).toLocaleString()}</p>
                            <p><strong>Message:</strong> {alert.message}</p>
                            <p><strong>Created By:</strong> {alert.createdBy}</p>
                        </div>
                    </div>
                </div>

                {alert.attachments && alert.attachments.length > 0 && (
                    <div className="card margin-top-lg" style={{ cursor: 'default' }}>
                        <div className="card-header">Attachments</div>
                        <div className="card-body">
                            {alert.attachments.map((file, index) => (
                                <div key={index} className="uploaded-file-item" style={{ marginBottom: 'var(--spacing-xs)' }}>
                                    <span><FaFileAlt /> {file.name}</span>
                                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="button-ghost">View <FaExternalLinkAlt size={10} /></a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AlertsList = ({ navigate, addToast, alerts, setAlerts, cities }) => {
    if (!canAccess('AlertsList')) return <p>Access Denied</p>;

    const [filters, setFilters] = useState({ cityId: '', status: '', severity: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAlerts = alerts.filter(alert => {
        const city = cities.find(c => c.id === alert.cityId);
        const matchesCity = filters.cityId ? alert.cityId === filters.cityId : true;
        const matchesStatus = filters.status ? alert.status === filters.status : true;
        const matchesSeverity = filters.severity ? alert.severity === filters.severity : true;
        const matchesSearch = searchTerm
            ? (city?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                alert.message.toLowerCase().includes(searchTerm.toLowerCase()))
            : true;
        return matchesCity && matchesStatus && matchesSeverity && matchesSearch;
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fade-in">
            <div className="full-screen-page-header" style={{ position: 'relative', top: 'unset', left: 'unset', width: 'unset', padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
                <h2><FaExclamationTriangle /> Weather Alerts & Warnings</h2>
                <div className="section-actions">
                    <IconButton icon={FaPlus} label="Create New Alert" onClick={() => navigate('AlertForm')} className="button-primary" />
                </div>
            </div>

            <div className="action-bar">
                <div className="left-actions">
                    <div className="search-bar-floating" style={{ width: '250px' }}>
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search Alerts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <IconButton icon={FaFilter} label="Filters" onClick={() => alert('Open Filters Panel')} />
                    <select name="cityId" onChange={handleFilterChange} value={filters.cityId} style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-md)', background: 'var(--bg-color-dark)', color: 'var(--text-color)' }}>
                        <option value="">All Cities</option>
                        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <select name="status" onChange={handleFilterChange} value={filters.status} style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-md)', background: 'var(--bg-color-dark)', color: 'var(--text-color)' }}>
                        <option value="">All Statuses</option>
                        {['Draft', 'Active', 'Resolved'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select name="severity" onChange={handleFilterChange} value={filters.severity} style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-md)', background: 'var(--bg-color-dark)', color: 'var(--text-color)' }}>
                        <option value="">All Severities</option>
                        {['Low', 'Medium', 'High'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="right-actions">
                    <IconButton icon={FaDownload} label="Export" onClick={() => addToast({ message: 'Alerts Exported', type: 'success' })} />
                </div>
            </div>

            {filteredAlerts.length === 0 ? (
                <div className="empty-state">
                    <FaExclamationCircle />
                    <h3>No Alerts Found</h3>
                    <p>It looks like there are no alerts matching your current filters. Try adjusting your search or filters.</p>
                    <IconButton icon={FaPlus} label="Create New Alert" onClick={() => navigate('AlertForm')} className="button-primary" />
                </div>
            ) : (
                <div className="card-grid">
                    {filteredAlerts.map(alert => (
                        <AlertCard key={alert.id} alert={alert} navigate={navigate} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Cities Management Components
const CityCard = ({ city, navigate }) => {
    return (
        <div className={`card status-blue`} onClick={() => navigate('CityDetailView', city.id)}>
            <div className={`card-header status-blue`}>
                <span><FaMapMarkerAlt /> {city.name}</span>
            </div>
            <div className="card-body">
                <p><strong>State:</strong> {city.state}</p>
                <p><strong>Country:</strong> {city.country}</p>
                <p><strong>Coordinates:</strong> {city.latitude}, {city.longitude}</p>
                <p><strong>Timezone:</strong> {city.timezone}</p>
            </div>
            <div className="card-footer">
                <span>View Details</span>
            </div>
        </div>
    );
};

const CityDetailView = ({ city, navigate, onUpdateCity, addToast }) => {
    if (!city) return <p>City not found.</p>;
    if (!canAccess('Cities', 'view')) return <p>Access Denied</p>;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(city);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'City Name is mandatory.';
        if (!formData.state) newErrors.state = 'State is mandatory.';
        if (!formData.country) newErrors.country = 'Country is mandatory.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            addToast({ message: 'Please correct the form errors.', type: 'error' });
            return;
        }
        onUpdateCity(city.id, formData);
        setIsEditing(false);
        addToast({ message: 'City details updated successfully!', type: 'success' });
    };

    return (
        <div className="full-screen-page fade-in">
            <div className="full-screen-page-header">
                <h2><FaCity /> City Details: {city.name}</h2>
                <div>
                    {canAccess('Cities', 'edit') && !isEditing && (
                        <IconButton icon={FaEdit} label="Edit City" onClick={() => setIsEditing(true)} className="button-secondary" />
                    )}
                    <IconButton icon={FaArrowLeft} label="Back to Cities" onClick={() => navigate('CitiesList')} className="button-ghost" />
                </div>
            </div>

            <div className="full-screen-page-content">
                <Breadcrumb path={[{ name: 'Dashboard', screen: 'Dashboard' }, { name: 'Cities', screen: 'CitiesList' }, { name: city.name, screen: 'CityDetailView', id: city.id }]} onNavigate={navigate} />

                {isEditing ? (
                    <div className="form-container">
                        <h3>Edit {city.name}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">City Name <span style={{ color: 'var(--status-red)' }}>*</span></label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                                {errors.name && <p className="error-message">{errors.name}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State <span style={{ color: 'var(--status-red)' }}>*</span></label>
                                <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} />
                                {errors.state && <p className="error-message">{errors.state}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country <span style={{ color: 'var(--status-red)' }}>*</span></label>
                                <input type="text" name="country" id="country" value={formData.country} onChange={handleChange} />
                                {errors.country && <p className="error-message">{errors.country}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="latitude">Latitude</label>
                                <input type="number" step="0.0001" name="latitude" id="latitude" value={formData.latitude} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="longitude">Longitude</label>
                                <input type="number" step="0.0001" name="longitude" id="longitude" value={formData.longitude} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="timezone">Timezone</label>
                                <input type="text" name="timezone" id="timezone" value={formData.timezone} onChange={handleChange} />
                            </div>
                            <div className="form-actions">
                                <IconButton icon={FaTimesCircle} label="Cancel" onClick={() => { setIsEditing(false); setFormData(city); setErrors({}); }} className="button-ghost" />
                                <IconButton icon={FaSave} label="Save Changes" type="submit" className="button-primary" />
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="card-grid" style={{ marginBottom: 'var(--spacing-xl)', gridTemplateColumns: '1fr' }}>
                        <div className="card" style={{ cursor: 'default' }}>
                            <div className="card-header">City Information</div>
                            <div className="card-body">
                                <p><strong>Name:</strong> {city.name}</p>
                                <p><strong>State:</strong> {city.state}</p>
                                <p><strong>Country:</strong> {city.country}</p>
                                <p><strong>Latitude:</strong> {city.latitude}</p>
                                <p><strong>Longitude:</strong> {city.longitude}</p>
                                <p><strong>Timezone:</strong> {city.timezone}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const CitiesList = ({ navigate, addToast, cities, setCities }) => {
    if (!canAccess('CitiesList')) return <p>Access Denied</p>;

    const [searchTerm, setSearchTerm] = useState('');
    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateNewCity = () => {
        const newCityName = prompt("Enter new city name:");
        if (newCityName) {
            const newCity = {
                id: `city${Date.now()}`,
                name: newCityName,
                state: "New State",
                country: "India",
                latitude: 0,
                longitude: 0,
                timezone: "Asia/Kolkata"
            };
            setCities(prev => [...prev, newCity]);
            addToast({ message: `City "${newCityName}" added.`, type: 'success' });
            navigate('CityDetailView', newCity.id, true); // Navigate to edit mode
        }
    };

    return (
        <div className="fade-in">
            <div className="full-screen-page-header" style={{ position: 'relative', top: 'unset', left: 'unset', width: 'unset', padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
                <h2><FaCity /> Cities Management</h2>
                <div className="section-actions">
                    <IconButton icon={FaPlus} label="Add New City" onClick={handleCreateNewCity} className="button-primary" />
                </div>
            </div>

            <div className="action-bar">
                <div className="left-actions">
                    <div className="search-bar-floating" style={{ width: '250px' }}>
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search Cities..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {filteredCities.length === 0 ? (
                <div className="empty-state">
                    <FaCity />
                    <h3>No Cities Found</h3>
                    <p>It looks like there are no cities matching your current search. Try adjusting your search or add a new city.</p>
                    <IconButton icon={FaPlus} label="Add New City" onClick={handleCreateNewCity} className="button-primary" />
                </div>
            ) : (
                <div className="card-grid">
                    {filteredCities.map(city => (
                        <CityCard key={city.id} city={city} navigate={navigate} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Prediction Model Components
const ModelCard = ({ model, navigate }) => {
    const statusClass = getStatusColorClass(model.status);
    return (
        <div className={`card status-${statusClass}`} onClick={() => navigate('PredictionModelDetailView', model.id)}>
            <div className={`card-header status-${statusClass}`}>
                <span><FaMicrochip /> {model.name}</span>
                <span className={`status-ribbon ${statusClass}`}>{model.status}</span>
            </div>
            <div className="card-body">
                <p><strong>Version:</strong> {model.version}</p>
                <p><strong>Last Run:</strong> {new Date(model.lastRunDate).toLocaleString()}</p>
                <p><strong>Description:</strong> {model.description.substring(0, 80)}...</p>
            </div>
            <div className="card-footer">
                <span>ID: {model.id}</span>
            </div>
        </div>
    );
};

const PredictionModelDetailView = ({ model, navigate, onUpdateModel, addToast }) => {
    if (!model) return <p>Model not found.</p>;
    if (!canAccess('PredictionModels', 'view')) return <p>Access Denied</p>;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(model);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Model Name is mandatory.';
        if (!formData.version) newErrors.version = 'Version is mandatory.';
        if (!formData.status) newErrors.status = 'Status is mandatory.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            addToast({ message: 'Please correct the form errors.', type: 'error' });
            return;
        }
        onUpdateModel(model.id, formData);
        setIsEditing(false);
        addToast({ message: 'Prediction Model details updated successfully!', type: 'success' });
    };

    return (
        <div className="full-screen-page fade-in">
            <div className="full-screen-page-header">
                <h2><FaMicrochip /> Model Details: {model.name}</h2>
                <div>
                    {canAccess('PredictionModels', 'edit') && !isEditing && (
                        <IconButton icon={FaEdit} label="Edit Model" onClick={() => setIsEditing(true)} className="button-secondary" />
                    )}
                    <IconButton icon={FaArrowLeft} label="Back to Models" onClick={() => navigate('PredictionModelsList')} className="button-ghost" />
                </div>
            </div>

            <div className="full-screen-page-content">
                <Breadcrumb path={[{ name: 'Dashboard', screen: 'Dashboard' }, { name: 'Prediction Models', screen: 'PredictionModelsList' }, { name: model.name, screen: 'PredictionModelDetailView', id: model.id }]} onNavigate={navigate} />

                {isEditing ? (
                    <div className="form-container">
                        <h3>Edit {model.name}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Model Name <span style={{ color: 'var(--status-red)' }}>*</span></label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                                {errors.name && <p className="error-message">{errors.name}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="version">Version <span style={{ color: 'var(--status-red)' }}>*</span></label>
                                <input type="text" name="version" id="version" value={formData.version} onChange={handleChange} />
                                {errors.version && <p className="error-message">{errors.version}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" value={formData.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastRunDate">Last Run Date</label>
                                <input type="datetime-local" name="lastRunDate" id="lastRunDate" value={formData.lastRunDate ? formData.lastRunDate.slice(0, 16) : ''} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status <span style={{ color: 'var(--status-red)' }}>*</span></label>
                                <select name="status" id="status" value={formData.status} onChange={handleChange}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                {errors.status && <p className="error-message">{errors.status}</p>}
                            </div>
                            <div className="form-actions">
                                <IconButton icon={FaTimesCircle} label="Cancel" onClick={() => { setIsEditing(false); setFormData(model); setErrors({}); }} className="button-ghost" />
                                <IconButton icon={FaSave} label="Save Changes" type="submit" className="button-primary" />
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="card-grid" style={{ marginBottom: 'var(--spacing-xl)', gridTemplateColumns: '1fr' }}>
                        <div className="card" style={{ cursor: 'default' }}>
                            <div className="card-header">Model Information</div>
                            <div className="card-body">
                                <p><strong>Name:</strong> {model.name}</p>
                                <p><strong>Version:</strong> {model.version}</p>
                                <p><strong>Description:</strong> {model.description}</p>
                                <p><strong>Last Run:</strong> {new Date(model.lastRunDate).toLocaleString()}</p>
                                <p><strong>Status:</strong> <span className={`status-badge ${getStatusColorClass(model.status)}`}>{model.status}</span></p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const PredictionModelsList = ({ navigate, addToast, predictionModels, setPredictionModels }) => {
    if (!canAccess('PredictionModelsList')) return <p>Access Denied</p>;

    const [searchTerm, setSearchTerm] = useState('');
    const filteredModels = predictionModels.filter(model =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.version.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateNewModel = () => {
        const newModelName = prompt("Enter new prediction model name:");
        if (newModelName) {
            const newModel = {
                id: `model${Date.now()}`,
                name: newModelName,
                version: "1.0",
                description: "New prediction model.",
                lastRunDate: new Date().toISOString(),
                status: "Draft"
            };
            setPredictionModels(prev => [...prev, newModel]);
            addToast({ message: `Model "${newModelName}" added.`, type: 'success' });
            navigate('PredictionModelDetailView', newModel.id, true);
        }
    };

    return (
        <div className="fade-in">
            <div className="full-screen-page-header" style={{ position: 'relative', top: 'unset', left: 'unset', width: 'unset', padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
                <h2><FaMicrochip /> Prediction Models Management</h2>
                <div className="section-actions">
                    <IconButton icon={FaPlus} label="Add New Model" onClick={handleCreateNewModel} className="button-primary" />
                </div>
            </div>

            <div className="action-bar">
                <div className="left-actions">
                    <div className="search-bar-floating" style={{ width: '250px' }}>
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search Models..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {filteredModels.length === 0 ? (
                <div className="empty-state">
                    <FaMicrochip />
                    <h3>No Prediction Models Found</h3>
                    <p>It looks like there are no prediction models matching your current search. Try adjusting your search or add a new model.</p>
                    <IconButton icon={FaPlus} label="Add New Model" onClick={handleCreateNewModel} className="button-primary" />
                </div>
            ) : (
                <div className="card-grid">
                    {filteredModels.map(model => (
                        <ModelCard key={model.id} model={model} navigate={navigate} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Audit Log Components
const AuditLogCard = ({ log }) => {
    let actionClass = 'grey';
    switch (log.action.split('_')[0]) {
        case 'CREATE': actionClass = 'green'; break;
        case 'UPDATE': actionClass = 'blue'; break;
        case 'DELETE': actionClass = 'red'; break;
        case 'PUBLISH': case 'APPROVE': actionClass = 'green'; break;
        case 'REJECT': actionClass = 'red'; break;
        default: actionClass = 'grey'; break;
    }
    return (
        <div className={`card status-${actionClass}`} style={{ cursor: 'default' }}>
            <div className={`card-header status-${actionClass}`}>
                <span><FaFileInvoice /> {log.action}</span>
            </div>
            <div className="card-body">
                <p><strong>Entity:</strong> {log.entityType} (ID: {log.entityId})</p>
                <p><strong>Details:</strong> {log.details}</p>
                <p><strong>User:</strong> {log.userId}</p>
            </div>
            <div className="card-footer">
                <span>Timestamp: {new Date(log.timestamp).toLocaleString()}</span>
            </div>
        </div>
    );
};

const AuditLogsList = ({ auditLogs }) => {
    if (!canAccess('AuditLogsList')) return <p>Access Denied</p>;

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ entityType: '', action: '' });

    const filteredLogs = auditLogs.filter(log => {
        const matchesSearch = searchTerm
            ? (log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.entityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.userId.toLowerCase().includes(searchTerm.toLowerCase()))
            : true;
        const matchesEntityType = filters.entityType ? log.entityType === filters.entityType : true;
        const matchesAction = filters.action ? log.action === filters.action : true;
        return matchesSearch && matchesEntityType && matchesAction;
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const uniqueEntityTypes = [...new Set(auditLogs.map(log => log.entityType))];
    const uniqueActions = [...new Set(auditLogs.map(log => log.action))];

    return (
        <div className="fade-in">
            <div className="full-screen-page-header" style={{ position: 'relative', top: 'unset', left: 'unset', width: 'unset', padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
                <h2><FaHistory /> Audit Logs</h2>
            </div>

            <div className="action-bar">
                <div className="left-actions">
                    <div className="search-bar-floating" style={{ width: '250px' }}>
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search Logs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select name="entityType" onChange={handleFilterChange} value={filters.entityType} style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-md)', background: 'var(--bg-color-dark)', color: 'var(--text-color)' }}>
                        <option value="">All Entities</option>
                        {uniqueEntityTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <select name="action" onChange={handleFilterChange} value={filters.action} style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-md)', background: 'var(--bg-color-dark)', color: 'var(--text-color)' }}>
                        <option value="">All Actions</option>
                        {uniqueActions.map(action => <option key={action} value={action}>{action}</option>)}
                    </select>
                </div>
            </div>

            {filteredLogs.length === 0 ? (
                <div className="empty-state">
                    <FaHistory />
                    <h3>No Audit Logs Found</h3>
                    <p>It looks like there are no audit logs matching your current filters. Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className="card-grid">
                    {filteredLogs.map(log => (
                        <AuditLogCard key={log.id} log={log} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Main App Component
const App = () => {
    const [currentScreen, setCurrentScreen] = useState({ name: 'Dashboard' });
    const [screenHistory, setScreenHistory] = useState([{ name: 'Dashboard' }]);
    const [forecasts, setForecasts] = useState(initialForecasts);
    const [alerts, setAlerts] = useState(initialAlerts);
    const [cities, setCities] = useState(CITIES);
    const [predictionModels, setPredictionModels] = useState(PREDICTION_MODELS);
    const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
    const [toasts, setToasts] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigate = useCallback((screenName, id = null, editMode = false) => {
        const newScreen = { name: screenName, id, editMode };
        setScreenHistory(prev => {
            // Prevent duplicate history entries for the same screen + ID
            if (prev.length > 0 && prev[prev.length - 1].name === screenName && prev[prev.length - 1].id === id && prev[prev.length - 1].editMode === editMode) {
                return prev;
            }
            return [...prev, newScreen];
        });
        setCurrentScreen(newScreen);
        setIsSidebarOpen(false); // Close sidebar on navigation
    }, []);

    const goBack = useCallback(() => {
        setScreenHistory(prev => {
            if (prev.length > 1) {
                const newHistory = prev.slice(0, -1);
                setCurrentScreen(newHistory[newHistory.length - 1]);
                return newHistory;
            }
            return prev;
        });
    }, []);

    const addToast = useCallback((toast) => {
        const id = Date.now();
        setToasts(prev => [...prev, { ...toast, id }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    }, []);

    const updateForecast = useCallback((id, updatedData) => {
        setForecasts(prev => prev.map(f => f.id === id ? { ...f, ...updatedData } : f));
        setAuditLogs(prev => [...prev, {
            id: `log${Date.now()}`, userId: currentUser.id, action: 'UPDATE_FORECAST',
            entityType: 'Forecast', entityId: id, timestamp: new Date().toISOString(),
            details: `Forecast ${id} updated (Status: ${updatedData.status || forecasts.find(f=>f.id===id).status}).`
        }]);
    }, [forecasts]);

    const createForecast = useCallback((newForecastData) => {
        setForecasts(prev => [...prev, newForecastData]);
        setAuditLogs(prev => [...prev, {
            id: `log${Date.now()}`, userId: currentUser.id, action: 'CREATE_FORECAST',
            entityType: 'Forecast', entityId: newForecastData.id, timestamp: new Date().toISOString(),
            details: `New forecast ${newForecastData.id} created.`
        }]);
        navigate('ForecastDetailView', newForecastData.id);
    }, [navigate]);

    const updateAlert = useCallback((id, updatedData) => {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, ...updatedData } : a));
        setAuditLogs(prev => [...prev, {
            id: `log${Date.now()}`, userId: currentUser.id, action: 'UPDATE_ALERT',
            entityType: 'Alert', entityId: id, timestamp: new Date().toISOString(),
            details: `Alert ${id} updated (Status: ${updatedData.status || alerts.find(a=>a.id===id).status}).`
        }]);
    }, [alerts]);

    const createAlert = useCallback((newAlertData) => {
        setAlerts(prev => [...prev, newAlertData]);
        setAuditLogs(prev => [...prev, {
            id: `log${Date.now()}`, userId: currentUser.id, action: 'CREATE_ALERT',
            entityType: 'Alert', entityId: newAlertData.id, timestamp: new Date().toISOString(),
            details: `New alert ${newAlertData.id} created.`
        }]);
        navigate('AlertDialogView', newAlertData.id);
    }, [navigate]);

    const updateCity = useCallback((id, updatedData) => {
        setCities(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
        setAuditLogs(prev => [...prev, {
            id: `log${Date.now()}`, userId: currentUser.id, action: 'UPDATE_CITY',
            entityType: 'City', entityId: id, timestamp: new Date().toISOString(),
            details: `City ${id} updated.`
        }]);
    }, []);

    const updatePredictionModel = useCallback((id, updatedData) => {
        setPredictionModels(prev => prev.map(m => m.id === id ? { ...m, ...updatedData } : m));
        setAuditLogs(prev => [...prev, {
            id: `log${Date.now()}`, userId: currentUser.id, action: 'UPDATE_PREDICTION_MODEL',
            entityType: 'PredictionModel', entityId: id, timestamp: new Date().toISOString(),
            details: `Prediction Model ${id} updated.`
        }]);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const renderScreen = () => {
        switch (currentScreen.name) {
            case 'Dashboard':
                return <Dashboard navigate={navigate} addToast={addToast} forecasts={forecasts} alerts={alerts} />;
            case 'ForecastsList':
                return <ForecastsList navigate={navigate} addToast={addToast} forecasts={forecasts} setForecasts={setForecasts} cities={cities} predictionModels={predictionModels} />;
            case 'ForecastDetailView':
                const forecast = forecasts.find(f => f.id === currentScreen.id);
                return <ForecastDetailView forecast={forecast} navigate={navigate} onUpdateForecast={updateForecast} addToast={addToast} cities={cities} predictionModels={predictionModels} />;
            case 'ForecastForm':
                return <ForecastForm onSave={createForecast} onCancel={goBack} addToast={addToast} cities={cities} predictionModels={predictionModels} isNew={true} />;
            case 'AlertsList':
                return <AlertsList navigate={navigate} addToast={addToast} alerts={alerts} setAlerts={setAlerts} cities={cities} />;
            case 'AlertDialogView':
                const alert = alerts.find(a => a.id === currentScreen.id);
                return <AlertDialogView alert={alert} navigate={navigate} onUpdateAlert={updateAlert} addToast={addToast} cities={cities} />;
            case 'AlertForm':
                return <AlertForm onSave={createAlert} onCancel={goBack} addToast={addToast} cities={cities} isNew={true} />;
            case 'CitiesList':
                return <CitiesList navigate={navigate} addToast={addToast} cities={cities} setCities={setCities} />;
            case 'CityDetailView':
                const city = cities.find(c => c.id === currentScreen.id);
                return <CityDetailView city={city} navigate={navigate} onUpdateCity={updateCity} addToast={addToast} />;
            case 'PredictionModelsList':
                return <PredictionModelsList navigate={navigate} addToast={addToast} predictionModels={predictionModels} setPredictionModels={setPredictionModels} />;
            case 'PredictionModelDetailView':
                const model = predictionModels.find(m => m.id === currentScreen.id);
                return <PredictionModelDetailView model={model} navigate={navigate} onUpdateModel={updatePredictionModel} addToast={addToast} />;
            case 'AuditLogsList':
                return <AuditLogsList auditLogs={auditLogs} />;
            default:
                return <Dashboard navigate={navigate} addToast={addToast} forecasts={forecasts} alerts={alerts} />;
        }
    };

    return (
        <div className="app-container">
            <Sidebar currentScreenName={currentScreen.name} navigate={navigate} isSidebarOpen={isSidebarOpen} />
            <Header onSearch={(term) => console.log('Global search for:', term)} navigate={navigate} toggleSidebar={toggleSidebar} />
            <main className="main-content">
                {renderScreen()}
            </main>
            <div className="toast-container">
                {toasts.map(toast => (
                    <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
                ))}
            </div>
            {/* Overlay for full-screen pages if the main-content is not hidden behind it */}
            {(currentScreen.name === 'ForecastDetailView' || currentScreen.name === 'ForecastForm' ||
              currentScreen.name === 'AlertDialogView' || currentScreen.name === 'AlertForm' ||
              currentScreen.name === 'CityDetailView' || currentScreen.name === 'PredictionModelDetailView') && (
                <div className="overlay-back-button" style={{ position: 'fixed', top: '20px', left: '270px', zIndex: 1001 }}>
                    <IconButton icon={FaArrowLeft} label="Back" onClick={goBack} className="button-ghost" />
                </div>
            )}
        </div>
    );
};

export default App;