// @flow

/**
 * A Wallet is a tuple with the structure:
 * [
 *  {string} cointype   The name of the wallet (type of coin).
 *  {string} address    The address of the wallet.
 * ]
 *
type Wallet = [
  string,
  string,
]
 */

/**
 * createWidget takes a DOM element and a list of wallets. Each wallet is a
 * tuple of the form [coinname, address]. It returns nothing and appends the
 * widget to the DOM element provided to DOMParent.
 * @param {HTMLElement} DOMParent 
 * @param {Wallet}      wallets 
 */
function createWidget(
  DOMParent,  // :  HTMLElement,
  wallets,    // :  Array<Wallet>,
  config
) {
  const $widget = DOMParent
  $widget.classList.add('jumbotron')
  $widget.classList.add('row')

  // Heading
  const $heading = document.createElement('h1')
  $heading.classList.add('display-4')
  $heading.appendChild(document.createTextNode(config.heading))

  const $lead = document.createElement('p')
  $lead.classList.add('lead')
  $lead.appendChild(document.createTextNode(config.lead))

  // Dropdown menu
  const $walletSelect = document.createElement('select')
  $walletSelect.classList.add('form-control')
  $walletSelect.classList.add('form-control-lg')

  // Columns
  const $col1 = document.createElement('div')
  $col1.classList.add('col-md-8')
  const $col2 = document.createElement('div')
  $col2.classList.add('col-md-4')

  // Router for event wiring
  const optionRouter = {}

  // Generate children for dropdown menu and donate panel
  wallets.forEach(wallet => {
    const [cointype, address] = wallet
    // Create Option
    const $walletOption = document.createElement('option')
    $walletOption.text = cointype
    $walletOption.value = cointype
    // Attach Option to Menu
    $walletSelect.add($walletOption)

    // Create Panel
    $walletPanel = document.createElement('div')
    $walletPanel.classList.add('card')
    $walletPanel.classList.add('w-75')
    $walletPanel.classList.add('bg-success')
    $walletPanel.classList.add('text-white')
    $walletBody = document.createElement('div')
    $walletBody.classList.add('card-body')

    // Heading
    $walletHeading = document.createElement('h1')
    $walletHeading.appendChild(document.createTextNode(cointype))
    $walletHeading.classList.add('card-title')

    // QR Code    
    $walletQR = document.createElement('img')
    // Set image info with qrserver API url
    $walletQR.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}`
    $walletQR.classList.add('card-img-top')

    // Address
    $walletAddress = document.createElement('p')
    $walletAddress.appendChild(document.createTextNode(`Address: ${address}`))
    $walletAddress.classList.add('card-text')

    // Attach the bits
    $walletPanel.appendChild($walletQR)
    $walletBody.appendChild($walletHeading)
    $walletBody.appendChild($walletAddress)
    $walletPanel.appendChild($walletBody)

    optionRouter[cointype] = $walletPanel
  })

  $walletSelect.onchange = () => {
    if ($col2.childNodes[0])
      $col2.removeChild($col2.childNodes[0])
    $col2.appendChild(optionRouter[$walletSelect.value])
  }

  $col2.appendChild(optionRouter[wallets[0][0]])
  $col1.appendChild($heading)
  $col1.appendChild($lead)
  $col1.appendChild($walletSelect)
  $widget.appendChild($col1)
  $widget.appendChild($col2)
}
