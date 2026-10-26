"""Build the reviewed, public-facing catalogues. Requires reportlab.

Run from the project root. Old versions remain recoverable in Git, rather than
being shipped alongside corrected copies under forgotten public URLs.
"""
from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether


ROOT = Path(__file__).resolve().parents[1]
NAVY = colors.HexColor('#0f2743')
BLUE = colors.HexColor('#0073bc')
INK = colors.HexColor('#334155')
LIGHT = colors.HexColor('#eef5fa')
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='OrbitTitle', fontName='Helvetica-Bold', fontSize=30, leading=35, textColor=NAVY, spaceAfter=16))
styles.add(ParagraphStyle(name='OrbitLead', fontName='Helvetica', fontSize=13, leading=20, textColor=INK, spaceAfter=18))
styles.add(ParagraphStyle(name='OrbitH2', fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=NAVY, spaceBefore=14, spaceAfter=7))
styles.add(ParagraphStyle(name='OrbitBody', fontName='Helvetica', fontSize=10, leading=15, textColor=INK, spaceAfter=10))
styles.add(ParagraphStyle(name='OrbitSmall', fontName='Helvetica', fontSize=8.5, leading=12.5, textColor=INK, spaceAfter=7))
styles.add(ParagraphStyle(name='OrbitEyebrow', fontName='Helvetica-Bold', fontSize=9, leading=13, textColor=BLUE, spaceAfter=12))


def para(text, style='OrbitBody'):
    return Paragraph(text, styles[style])


def section(title, text):
    return KeepTogether([para(title, 'OrbitH2'), para(text)])


def card(title, text):
    table = Table([[para(title, 'OrbitH2')], [para(text, 'OrbitSmall')]], colWidths=[77*mm])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.4, colors.HexColor('#dbe7f0')),
        ('LEFTPADDING', (0, 0), (-1, -1), 12), ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 9), ('BOTTOMPADDING', (0, -1), (-1, -1), 9),
    ]))
    return table


def page_chrome(canvas, doc):
    width, height = doc.pagesize
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, height-13*mm, width, 13*mm, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont('Helvetica-Bold', 9)
    canvas.drawString(20*mm, height-8.5*mm, 'ORBIT ENGINEERING SOLUTIONS')
    canvas.setFont('Helvetica', 8)
    canvas.drawRightString(width-20*mm, height-8.5*mm, 'BUSINESS CATALOGUE')
    canvas.setStrokeColor(colors.HexColor('#dbe3ec'))
    canvas.line(20*mm, 18*mm, width-20*mm, 18*mm)
    canvas.setFillColor(INK)
    canvas.setFont('Helvetica', 7.5)
    canvas.drawString(20*mm, 12.5*mm, 'orbitengineerings.com  |  26 October 2026  |  Specifications confirmed in quotation')
    canvas.drawRightString(width-20*mm, 12.5*mm, f'{doc.page}')
    canvas.restoreState()


def title(kicker, heading, lead):
    return [para(kicker.upper(), 'OrbitEyebrow'), para(heading, 'OrbitTitle'), para(lead, 'OrbitLead')]


def contact():
    return [
        section('Discuss your requirements', 'Email: <link href="mailto:info@orbitengineerings.com" color="#0073bc">info@orbitengineerings.com</link><br/>Telephone: +91 70241 28029<br/>Website: <link href="https://orbitengineerings.com/contact" color="#0073bc">orbitengineerings.com/contact</link>'),
        para('Operator: Vijay Kumar Tiwari, trading as Orbit Engineering Solutions (proprietorship).<br/>Business address: GF, E-45, Pride City, Katara Hills, Bhopal, Madhya Pradesh 462043, India.', 'OrbitSmall'),
        para('Grievance Officer: Vijay Kumar Tiwari (Proprietor), +91 70241 28029, info@orbitengineerings.com.<br/>Privacy notice: <link href="https://orbitengineerings.com/privacy-policy" color="#0073bc">orbitengineerings.com/privacy-policy</link>', 'OrbitSmall'),
    ]


def commercial_note():
    return section('Confirm before ordering', 'This brochure is introductory information for business enquiries. Confirm the manufacturer, model, configuration, performance, suitability, availability and applicable certificates with our team. Pricing, taxes, delivery, warranty, installation, cancellation and refund terms are set out in the accepted quotation/contract, subject to applicable law. No universal product warranty or performance guarantee is made here. Names of third-party products identify their owners and do not by themselves establish endorsement or authorised dealership.')


def build(path, heading, story):
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(path), pagesize=(210*mm, 297*mm), rightMargin=20*mm, leftMargin=20*mm,
                           topMargin=26*mm, bottomMargin=26*mm, title=heading, author='Orbit Engineering Solutions',
                           subject='B2B product and engineering introduction - 26 October 2026')
    doc.build(story, onFirstPage=page_chrome, onLaterPages=page_chrome)
    print(path.relative_to(ROOT))


main = title('Engineering & product overview', 'Water. Measurement.<br/>Automation.',
             'Instrumentation, control and engineering solutions for water, wastewater and industrial applications.')
main += [para('Orbit Engineering Solutions, based in Bhopal, works with businesses on process measurement, automation and water infrastructure requirements. Start with your application and operating conditions; our team can discuss a suitable scope and prepare a quotation.')]
main += [Table([
    [card('Water systems', 'Treatment, filtration, pumping, disinfection and wastewater applications.'), card('Instrumentation', 'Level, flow, pressure, temperature and water-quality measurement.')],
    [card('Automation', 'PLC panels, SCADA, telemetry and process monitoring integration.'), card('Engineering support', 'Application discussions, system integration, installation and service scope.')],
], colWidths=[85*mm, 85*mm], style=TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BOTTOMPADDING',(0,0),(-1,-1),12),('LEFTPADDING',(0,0),(-1,-1),0)]))]
main += [section('Built around your application', 'Share your process medium, ranges, site conditions, drawings and required interfaces. We will clarify the equipment and service scope, operating limits and responsibilities before a commercial commitment.'),
         para('Product photographs, references and specifications in a proposal must be assessed for the particular configuration. Ask for current manufacturer documentation and applicable certificates for the proposed order.', 'OrbitSmall'), PageBreak()]
main += title('Explore the catalogue', 'From field measurement<br/>to process control.', 'Discuss the equipment and engineering scope relevant to your site.')
main += [section('Measurement & control', 'Flow meters, level instruments, pressure transmitters, temperature instruments, water-quality analysers, valves and electric actuators.'),
         section('Water & industrial systems', 'Water and wastewater treatment, disinfection and dosing, pumping automation, telemetry, electrical/control panels and application-specific integration.'),
         section('Specialist applications', 'Submersible dredging and scour-monitoring concepts can be discussed with our team. The selected equipment, deployment method and safety assessment depend on site conditions.'),
         commercial_note()] + contact()
main_path = ROOT/'public/assets/docs/brochure.pdf'
build(main_path, 'Orbit Engineering Solutions - Business Overview', main)
for target in [ROOT/'public/assets/docs/Orbit brocher.pdf_.pdf', ROOT/'src/assets/Orbit brocher.pdf_.pdf']:
    copyfile(main_path, target)

sdv = title('Specialist application overview', 'Submersible dredging<br/>vehicle systems', 'Discuss remote sediment-removal equipment for a site-specific dredging scope.')
sdv += [section('Application', 'Submersible dredging systems can support sediment and sludge-removal work in suitable tanks, reservoirs and other water infrastructure. Equipment selection depends on access, sediment properties, water conditions and environmental restrictions.'),
        section('System scope to discuss', 'A proposal may include a submersible vehicle, compatible dredging pump, hydraulic/power equipment, hose management, controls and monitoring. Accessories, materials and operating limits must be confirmed for the selected configuration.'),
        section('Planning and operation', 'Survey the site, identify buried services and intake structures, assess retrieval and emergency procedures, plan sediment transport/disposal and define operator training and supervision. Remote operation does not remove the need for a qualified safety assessment.'),
        para('This introduction is not an operating manual. Use the selected manufacturer\'s approved procedures and the site-specific method statement.', 'OrbitSmall'), PageBreak()]
sdv += title('Prepare an enquiry', 'Define the work.<br/>Confirm the system.', 'Our team can discuss the application and quote a defined equipment and service scope.')
sdv += [section('Information to share', 'Site layout and access; water depth and operating conditions; sediment type and indicative quantity; obstructions; discharge distance and destination; available utilities; permissions and environmental controls; required schedule.'),
        section('Information to confirm in the proposal', 'Vehicle and pump model; operating limits and materials; hose and power arrangements; deployment/retrieval method; control and monitoring interfaces; commissioning/training; service responsibilities and applicable documentation.'),
        commercial_note()] + contact()
build(ROOT/'src/assets/SDV_Orbit.pdf', 'Submersible Dredging - Application Overview', sdv)

scour = title('Specialist application overview', 'Scour and water-level<br/>monitoring', 'Measurement and telemetry concepts to support engineering assessment of hydraulic structures.')
scour += [section('Monitoring purpose', 'Monitoring can provide observations of water level, bed movement and other selected parameters near bridges or hydraulic structures. Measurements support an engineering assessment; they do not guarantee structural safety or predict every failure.'),
          section('A site-specific measurement design', 'Select suitable measurement technology and sensor locations after a hydraulic and structural assessment. Scour/bed-level measurement and water-level measurement are different tasks; a general water-level radar should not be assumed to measure submerged bed scour.'),
          section('Integration scope', 'A proposal may include suitable sensors, a control/data-logging panel, power arrangements, telemetry, visualisation and agreed alerts. Data availability depends on sensor suitability, calibration, power, communications and maintenance.'),
          para('Alert limits and the actions taken in response must be defined by competent engineers and the structure operator. Monitoring supplements inspection and maintenance procedures.', 'OrbitSmall'), PageBreak()]
scour += title('Prepare an enquiry', 'Measure the right<br/>parameters.', 'Discuss monitoring objectives, site constraints and the response process before equipment selection.')
scour += [section('Information to share', 'Structure and river drawings; monitoring objectives; hydraulic/bed conditions; expected ranges and accuracy; mounting access; power/connectivity; logging intervals; alert recipients and responsibility; maintenance and data-retention requirements.'),
          section('Information to confirm in the proposal', 'Sensor principle/model and environmental limits; installation design; calibration and validation; communications and logging; alert configuration; commissioning/acceptance criteria; inspection and maintenance scope.'),
          commercial_note()] + contact()
build(ROOT/'src/assets/Real-Time Scour Detection for Stronger Foundations.pdf', 'Scour Monitoring - Application Overview', scour)
