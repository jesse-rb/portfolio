//
// Group prototype
//
function Group(c, groupsContainer, parentElem) {
    let _me         = this;
    let _c          = c;
    let _groupsContainer = groupsContainer;

    let _pieces = [];
    let _groups = [];

    let _scaleFactor = 1.01;
    let _moveStrength = 1;

    let _lowestX = 0;
    let _lowestY = 0;
    let _width = 0;
    let _height = 0;

    //
    // Init selected group ui
    //

    // Popup container div
    let _popup = document.createElement('div');
    parentElem.appendChild(_popup);
    _popup.className = 'popup hidden';
    // Delete fieldset
    _popup.appendChild(document.createElement('fieldset'));
    _popup.lastChild.className = 'controls-group';
    _popup.lastChild.appendChild(document.createElement('legend'));
    _popup.lastChild.lastChild.textContent = 'other';
    // Delete button
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_delete');
    _popup.lastChild.lastChild.lastChild.textContent = 'delete';
    let _popupDelete = document.createElement('button');
    _popup.lastChild.lastChild.appendChild(_popupDelete);
    _popupDelete.setAttribute('id', 'popup_delete');
    _popupDelete.className = 'button material-icons'
    _popupDelete.textContent = 'delete'
    _popupDelete.addEventListener('click', function(e) {
        _me.Delete();
    }, false);
    // Color fieldset
    _popup.appendChild(document.createElement('fieldset'));
    _popup.lastChild.className = 'controls-group';
    _popup.lastChild.appendChild(document.createElement('legend'));
    _popup.lastChild.lastChild.textContent = 'color';
    // Base color
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_base_color');
    _popup.lastChild.lastChild.lastChild.textContent = 'stroke color';
    let _popupBaseColor = document.createElement('input');
    _popup.lastChild.lastChild.appendChild(_popupBaseColor);
    _popupBaseColor.setAttribute('id', 'popup_base_color');
    _popupBaseColor.setAttribute('type', 'color');
    _popupBaseColor.setAttribute('value', '0x000000');
    _popupBaseColor.addEventListener('change', function(e) {
        _me.SetColor(e.target.value);
    }, false);
    // Weight fieldset
    _popup.appendChild(document.createElement('fieldset'));
    _popup.lastChild.className = 'controls-group';
    _popup.lastChild.appendChild(document.createElement('legend'));
    _popup.lastChild.lastChild.textContent = 'weight';
    // Stroke size
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_stroke_size');
    _popup.lastChild.lastChild.lastChild.textContent = 'stroke size';
    let _popupStrokeSize = document.createElement('input');
    _popup.lastChild.lastChild.appendChild(_popupStrokeSize);
    _popupStrokeSize.setAttribute('id', 'popup_stroke_size');
    _popupStrokeSize.setAttribute('type', 'range');
    _popupStrokeSize.setAttribute('min', '1');
    _popupStrokeSize.setAttribute('max', '100');
    _popupStrokeSize.setAttribute('value', '50');
    _popupStrokeSize.addEventListener('change', function(e) {
        _me.SetSize(e.target.value);
    }, false);
    // Scale fieldset
    _popup.appendChild(document.createElement('fieldset'));
    _popup.lastChild.className = 'controls-group';
    _popup.lastChild.appendChild(document.createElement('legend'));
    _popup.lastChild.lastChild.textContent = 'scale';
    // Scale strength
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_scale_strength');
    _popup.lastChild.lastChild.lastChild.textContent = 'scale strength';
    let _popupScaleStrengthSlider = document.createElement('input');
    _popup.lastChild.lastChild.appendChild(_popupScaleStrengthSlider);
    _popupScaleStrengthSlider.setAttribute('id', 'popup_scale_strength');
    _popupScaleStrengthSlider.setAttribute('type', 'range');
    _popupScaleStrengthSlider.setAttribute('min', '1.01');
    _popupScaleStrengthSlider.setAttribute('max', '2');
    _popupScaleStrengthSlider.setAttribute('step', '0.01')
    _popupScaleStrengthSlider.setAttribute('value', _scaleFactor);
    _popupScaleStrengthSlider.addEventListener('change', function(e) {
        _scaleFactor = parseFloat(e.target.value);
    }, false);
    // Scale down button
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_scale_down');
    _popup.lastChild.lastChild.lastChild.textContent = 'scale down';
    let _popupScaleDownButton = document.createElement('button');
    _popup.lastChild.lastChild.appendChild(_popupScaleDownButton);
    _popupScaleDownButton.setAttribute('id', 'popup_scale_down');
    _popupScaleDownButton.className = 'material-icons button'
    _popupScaleDownButton.textContent = 'remove';
    _popupScaleDownButton.addEventListener('click', function(e) {
        _me.ScaleDown(_scaleFactor);
    }, false);
    // Scale up button
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_scale_up');
    _popup.lastChild.lastChild.lastChild.textContent = 'scale up';
    let _popupScaleUpButton = document.createElement('button');
    _popup.lastChild.lastChild.appendChild(_popupScaleUpButton);
    _popupScaleUpButton.setAttribute('id', 'popup_scale_up');
    _popupScaleUpButton.className = 'material-icons button'
    _popupScaleUpButton.textContent = 'add';
    _popupScaleUpButton.addEventListener('click', function(e) {
        _me.ScaleUp(_scaleFactor);
    }, false);
    // Move fieldset
    _popup.appendChild(document.createElement('fieldset'));
    _popup.lastChild.className = 'controls-group';
    _popup.lastChild.appendChild(document.createElement('legend'));
    _popup.lastChild.lastChild.textContent = 'move';
    // Move strength
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_move_strength');
    _popup.lastChild.lastChild.lastChild.textContent = 'move strength';
    let _popupMoveStrengthSlider = document.createElement('input');
    _popup.lastChild.lastChild.appendChild(_popupMoveStrengthSlider);
    _popupMoveStrengthSlider.setAttribute('id', 'popup_move_strength');
    _popupMoveStrengthSlider.setAttribute('type', 'range');
    _popupMoveStrengthSlider.setAttribute('min', '1');
    _popupMoveStrengthSlider.setAttribute('max', '1000');
    _popupMoveStrengthSlider.setAttribute('step', '1');
    _popupMoveStrengthSlider.setAttribute('value', _moveStrength);
    _popupMoveStrengthSlider.addEventListener('change', function(e) {
        _moveStrength = parseInt(e.target.value);
    }, false);
    // Move down button
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_move_down');
    _popup.lastChild.lastChild.lastChild.textContent = 'move down';
    let _popupMoveDownButton = document.createElement('button');
    _popup.lastChild.lastChild.appendChild(_popupMoveDownButton);
    _popupMoveDownButton.setAttribute('id', 'popup_move_down');
    _popupMoveDownButton.className = 'material-icons button';
    _popupMoveDownButton.innerHTML = 'south';
    _popupMoveDownButton.addEventListener('click', function(e) {
        _me.MoveDown(_moveStrength);
    }, false);
    // Move up button
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_move_up');
    _popup.lastChild.lastChild.lastChild.textContent = 'move up';
    let _popupMoveUpButton = document.createElement('button');
    _popup.lastChild.lastChild.appendChild(_popupMoveUpButton);
    _popupMoveUpButton.setAttribute('id', 'popup_move_up');
    _popupMoveUpButton.className = 'material-icons button';
    _popupMoveUpButton.innerHTML = 'north';
    _popupMoveUpButton.addEventListener('click', function(e) {
        _me.MoveUp(_moveStrength);
    }, false);
    // Move left button
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_move_left');
    _popup.lastChild.lastChild.lastChild.textContent = 'move left';
    let _popupMoveLeftButton = document.createElement('button');
    _popup.lastChild.lastChild.appendChild(_popupMoveLeftButton);
    _popupMoveLeftButton.setAttribute('id', 'popup_move_left');
    _popupMoveLeftButton.className = 'material-icons button';
    _popupMoveLeftButton.innerHTML = 'west';
    _popupMoveLeftButton.addEventListener('click', function(e) {
        _me.MoveLeft(_moveStrength);
    }, false);
    // Move right button
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_move_right');
    _popup.lastChild.lastChild.lastChild.textContent = 'move right';
    let _popupMoveRightButton = document.createElement('button');
    _popup.lastChild.lastChild.appendChild(_popupMoveRightButton);
    _popupMoveRightButton.setAttribute('id', 'popup_move_right');
    _popupMoveRightButton.className = 'material-icons button';
    _popupMoveRightButton.innerHTML = 'east';
    _popupMoveRightButton.addEventListener('click', function(e) {
        _me.MoveRight(_moveStrength);
    }, false);
    // Experimental fieldset
    _popup.appendChild(document.createElement('fieldset'));
    _popup.lastChild.className = 'controls-group';
    _popup.lastChild.appendChild(document.createElement('legend'));
    _popup.lastChild.lastChild.textContent = 'experimental';
    // Shadow color
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_shadow_color');
    _popup.lastChild.lastChild.lastChild.textContent = 'shadow color';
    let _popupShadowColor = document.createElement('input');
    _popup.lastChild.lastChild.appendChild(_popupShadowColor);
    _popupShadowColor.setAttribute('id', 'popup_shadow_color');
    _popupShadowColor.setAttribute('type', 'color');
    _popupShadowColor.setAttribute('value', '0x000000');
    _popupShadowColor.addEventListener('change', function(e) {
        _me.SetShadowColor(e.target.value);
    }, false);
    // Shadow blur
    _popup.lastChild.appendChild(document.createElement('div'));
    _popup.lastChild.lastChild.appendChild(document.createElement('label'));
    _popup.lastChild.lastChild.lastChild.setAttribute('for', 'popup_shadow_blur');
    _popup.lastChild.lastChild.lastChild.textContent = 'shadow blur';
    let _popupShadowBlur = document.createElement('input');
    _popup.lastChild.lastChild.appendChild(_popupShadowBlur);
    _popupShadowBlur.setAttribute('id', 'popup_shadow_blur');
    _popupShadowBlur.setAttribute('type', 'range');
    _popupShadowBlur.setAttribute('min', '0');
    _popupShadowBlur.setAttribute('max', '100');
    _popupShadowBlur.setAttribute('value', '50');
    _popupShadowBlur.addEventListener('change', function(e) {
        _me.SetShadowBlur(e.target.value);
    }, false);

    //
    // Init group display ui
    //

    // Group display
    let container = document.createElement('div');
    _groupsContainer.appendChild(container);
    container.className = 'group'
    // Select group button
    let selectBtn = document.createElement('button');
    container.appendChild(selectBtn);
    selectBtn.className     = 'button material-icons';
    selectBtn.textContent   = 'mouse';
    selectBtn.addEventListener('click', function(e) {
        _me.ShowUi();
        _c.SetActiveGroup(_me)
    }, false);

    //
    // Declare private functions
    //
    let getPieces = function() {
        return _pieces;
    }
    let getGroups = function() {
        return _groups;
    }

    let calcBounds = function(p) {
        let lx = p.GetLowestX();
        let ly = p.GetLowestY();
        let w = p.GetWidth();
        let h = p.GetHeight();
        if (lx < _lowestX) {
            _lowestX = lx;
        }
        if (ly < _lowestY) {
            _lowestY = ly;
        }
        if (w > _width) {
            _width = w;
        }
        if (h > _height) {
            _height = h;
        }
    }

    //
    // Declare public functions
    //

    // Select and deselect tool
    this.Select = function() {
        container.classList.add('active-tool');
        _me.ShowUi();
    }
    this.Deselect = function() {
        container.classList.remove('active-tool');
    }

    // Hide and show selected group ii
    this.ShowUi = function() {
        _c.Deselect();
        _popup.classList.remove('hidden')
    }
    this.HideUi = function() {
        _popup.classList.add('hidden')
    }
    
    // Add or remove piece from group
    this.AddPiece = function(piece) {
        _pieces.push(piece);
        calcBounds(piece);
    }
    this.RemovePiece = function(piece) {
        _pieces.splice(_pieces.indexOf(piece), 1);
    }

    // Add or remove group from group
    this.AddGroup = function(group) {
        _groups.push(group);
        for (p of group) {
            calcBounds(p);
        }
    }
    this.RemoveGroup = function(group) {
        _groups.splice(_groups.indexOf(group));
    }

    this.Delete = function() {
        for (p of _pieces) {
            let removeIndex = _c.Remove(p);
            _c.SendDelete(removeIndex);
        }
        for (g of _groups) {
            g.Delete();
        }
    }

    // Change group size
    this.SetSize = function(size) {
        for (p of _pieces) {
            p.Hide();
            _c.CleanAroundPiece(p);
            p.SetSize(size);
            p.Show();
            _c.SendUpdate(p);
        }
        for (g of _groups) {
            g.SetSize(size);
        }
        // _c.RefreshSection(_lowestX, _lowestY, _width, _height);
        // console.log(_lowestX, _lowestY, _width, _height);
        // _c.Refresh();
    }

    // Change group blur size
    this.SetShadowBlur = function(size) {
        for (p of _pieces) {
            p.SetShadowBlur(size);
            _c.RefreshSection(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight());
            _c.SendUpdate(p);
        }
        for (g of _groups) {
            g.SetShadowBlur(size);
        }
    }

    // Change group color
    this.SetColor = function(color) {
        for (p of _pieces) {
            p.SetColor(color);
            _c.RefreshSection(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight());
            _c.SendUpdate(p);
        }
        for (g of _groups) {
            g.SetColor(color);
        }
    }

    // Change group blur color
    this.SetShadowColor = function(color) {
        for (p of _pieces) {
            p.SetShadowColor(color);
            _c.RefreshSection(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight());
            _c.SendUpdate(p);
        }
        for (g of _groups) {
            g.SetShadowColor(color);
        }
    }

    // Move group
    this.MoveLeft = function(amount) {
        for (p of _pieces) {
            _c.ClearPiece(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight(), p);
            p.MoveLeft(amount);
            _c.RefreshSection(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight());
            _c.SendUpdate(p);
        }
        for (g of _groups) {
            g.MoveLeft(amount);
        }
    }
    this.MoveRight = function(amount) {
        for (p of _pieces) {
            _c.ClearPiece(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight(), p);
            p.MoveRight(amount);
            _c.RefreshSection(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight());
            _c.SendUpdate(p);
        }
        for (g of _groups) {
            g.MoveRight(amount);
        }
    }
    this.MoveUp = function(amount) {
        for (p of _pieces) {
            _c.ClearPiece(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight(), p);
            p.MoveUp(amount);
            _c.RefreshSection(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight());
            _c.SendUpdate(p);
        }
        for (g of _groups) {
            g.MoveUp(amount);
        }
    }
    this.MoveDown = function(amount) {
        for (p of _pieces) {
            _c.ClearPiece(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight(), p);
            p.MoveDown(amount);
            _c.RefreshSection(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight());
            _c.SendUpdate(p);
        }
        for (g of _groups) {
            g.MoveDown(amount);
        }
    }

    // Scale group
    this.ScaleUp = function(scaleFactor) {
        for (p of _pieces) {
            p.Hide();
            _c.CleanAroundPiece(p);
            p.ScaleUp(scaleFactor);
            p.Show();
            _c.SaveSession();
            _c.SendUpdate(p);
        }
        for (g of _groups) {
            g.ScaleUp(scaleFactor);
        }
    }
    this.ScaleDown = function(scaleFactor) {
        for (p of _pieces) {
            _c.ClearPiece(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight(), p);
            p.ScaleDown(scaleFactor);
            _c.RefreshSection(p.GetLowestX(), p.GetLowestY(), p.GetWidth(), p.GetHeight());
            _c.SendUpdate(p);
        }
        for (g of _groups) {
            g.ScaleDown(scaleFactor);
        }
    }
}